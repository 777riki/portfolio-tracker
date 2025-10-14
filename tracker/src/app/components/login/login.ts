import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  email: string = '';
  password: string = '';

  ngOnInit(): void {
    this.authService.getAllUsersDetails();
  }

  async login(user_mail: string, user_password: string): Promise<void> {
    if(user_mail == '' || user_password == '') {
      alert('All fields are mandatory!');
      return;
    }

    console.log(user_mail, user_password);

    const exists = await this.authService.userExists(user_mail);
    if (!exists) {
      console.log('User not found!');
      alert('User not found!');
      return;
    }

    const correct = await this.authService.rightPassword(user_mail, user_password);
    if (correct) {
      console.log('Correct password! Login successfull!');
      this.authService.isLoggedIn.set(true);
      this.router.navigate(['/']);
      
      const current_user = await this.authService.getUserByEmail(user_mail);
      console.log('Current user:', current_user);
      this.authService.userID.set(current_user?.id);
    } else {
      console.log('Wrong password!');
      alert('Wrong password!');
    }
  }

}
