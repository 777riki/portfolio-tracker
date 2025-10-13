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

  email: string = '';

  async sendResetLink(user_mail: string): Promise<void> {
    if (user_mail === '') {
      alert('All fields are mandatory!');
      return;
    }

    const exists = await this.authService.userExists(user_mail);
    if (!exists) {
      alert('Email not found!');
      return;
    }

    const user = await this.authService.getUserByEmail(user_mail);
    if (user) {
      console.log('User password:', user.password);
      this.router.navigate(['/login'])
    }
  }
}
