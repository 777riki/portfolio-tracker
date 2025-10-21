import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  showAlert = false;
  alertMessage = '';

  ngOnInit(): void {
    this.authService.getAllUsersDetails();
  }

  async signup(user_name: string, user_mail: string, user_password: string, user_confirmPassword: string): Promise<void> {
    if (user_name == '' || user_mail == '' || user_password == '' || user_confirmPassword == '') {
      this.alertMessage = '❌ All fields are mandatory!';
      this.showAlert = true;
      return;
    }

    if (user_password !== user_confirmPassword) {
      this.alertMessage = '❌ Passwords must be the same!';
      this.showAlert = true;
      console.log('Passwords must be the same!');
      return;
    }

    const exists = await this.authService.userExists(user_mail);
    if (exists) {
      this.alertMessage = '❌ Email already associated with another account!';
      this.showAlert = true;
      console.log('Email already associated with another account!');
      return;
    }

    await this.authService.addUser(user_name, user_mail, user_password);

    console.log('Account created successfully!');
    this.alertMessage = '✅ Account created successfully!';
    this.showAlert = true;

    const current_user = await this.authService.getUserByEmail(user_mail);
    console.log('Current user:', current_user);
    this.authService.userID.set(current_user?.id);

    this.authService.isLoggedIn.set(true);
    this.authService.getAllUsersDetails();
    this.router.navigate(['/']);
  }

  closeAlert() {
    this.showAlert = false;
  }
}
