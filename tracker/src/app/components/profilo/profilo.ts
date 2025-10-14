import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { db } from '../../app.database';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './profilo.html',
  styleUrl: './profilo.css'
})
export class Profilo implements OnInit {

  authService = inject(Auth);
  router = inject(Router);

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  currentUser_name: WritableSignal<string> = signal('');
  currentUser_mail: WritableSignal<string> = signal('');
  currentUser_password: WritableSignal<string> = signal('');

  async ngOnInit(): Promise<void> {
    const id = this.authService.userID();
    if (id !== undefined) {
      const currentUser = await this.authService.getUserByID(id);
      if (currentUser) {
        console.log('Current user:', currentUser);
        this.currentUser_name.set(currentUser.name);
        this.currentUser_mail.set(currentUser.email);
        this.currentUser_password.set(currentUser.password);

        this.name = currentUser.name;
        this.email = currentUser.email;
        this.password = currentUser.password;
        this.confirmPassword = currentUser.password;
      }
    } else {
      console.warn('No user logged in, redirecting...');
      this.router.navigate(['/login']);
    }
  }

  async saveChanges(user_name: string, user_mail: string, user_password: string, user_confirmPassword: string): Promise<void> {
    if (user_name == '' || user_mail == '' || user_password == '' || user_confirmPassword == '') {
      alert('All fields are mandatory!');
      return;
    }

    if (user_password !== user_confirmPassword) {
      alert('Passwords must be the same!');
      console.log('Passwords must be the same!');
      return;
    }

    this.authService.updateUserData(user_name, user_mail, user_password);
    console.log('User updated successfully');
    this.authService.getAllUsersDetails();
    
  }
}
