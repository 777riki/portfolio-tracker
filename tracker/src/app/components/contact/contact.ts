import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  name: string = '';
  email: string = '';
  object: string = '';
  message: string = '';

  showAlert = false;
  alertMessage = '';

  async send(user_name: string, user_email: string, user_object: string, user_message: string): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      if (user_name == '' || user_email == '' || user_object == '' || user_message == '') {
        this.alertMessage = '❌ All fields are mandatory!';
        this.showAlert = true;
        return
      }
      try {
        const response = await emailjs.send("service_i244dxm", "template_9zggoca", {
          name: user_name,
          time: new Date().toLocaleString(),
          message: user_message,
          email: user_email,
          subject: user_object
        },
          { publicKey: 'lEcvSC2l4Fhqgg5ws' });
        this.name = '';
        this.email = '';
        this.object = '';
        this.message = '';
        this.alertMessage = '✅ Email sent successfully!';
        this.showAlert = true;
      } catch (error) {
        console.log(error);
        this.alertMessage = '❌ Something went wrong! :(';
        this.showAlert = true;
      }
    } else {
      if (user_object == '' || user_message == '') {
        this.alertMessage = '❌ All fields are mandatory!';
        this.showAlert = true;
        return
      }
      let id = this.authService.userID();
      if (id != undefined) {
        let user = await this.authService.getUserByID(id);
        try {
          const response = await emailjs.send("service_i244dxm", "template_9zggoca", {
            name: user?.name,
            time: new Date().toLocaleString(),
            message: user_message,
            email: user?.email,
            subject: user_object
          },
            { publicKey: 'lEcvSC2l4Fhqgg5ws' });
          this.object = '';
          this.message = '';
          this.alertMessage = '✅ Email sent successfully!';
          this.showAlert = true;
        } catch (error) {
          console.log(error);
          this.alertMessage = '❌ All fields are mandatory!';
          this.showAlert = true;
        }
      }
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

}
