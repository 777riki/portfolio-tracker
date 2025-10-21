import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-forgot',
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot.html',
  styleUrl: './forgot.css'
})
export class Forgot {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  showAlert = false;
  alertMessage = '';

  email: string = '';

  async sendResetLink(user_mail: string): Promise<void> {
    if (user_mail === '') {
      this.alertMessage = '❌ All fields are mandatory!';
      this.showAlert = true;
      return;
    }

    const exists = await this.authService.userExists(user_mail);
    if (!exists) {
      this.alertMessage = '❌ Email not found!';
      this.showAlert = true;
      return;
    }

    const user = await this.authService.getUserByEmail(user_mail);
    if (user) {
      this.alertMessage = '✅ Your password is: ' + user.password;
      this.showAlert = true;
      this.router.navigate(['/login'])
    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}
