import { Injectable, signal, WritableSignal } from '@angular/core';
import { db } from '../app.database';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);

  async getAllUsersDetails() {
    const allUsers = await db.users.toArray();
    console.log('All Users: ', allUsers)
  }

  async addUser(user_name: string, user_email: string, user_password: string) {
    await db.users.add({ name: user_name, email: user_email, password: user_password, date_created: new Date() });
  }

  async userExists(user_email: string): Promise<boolean> {
    const count = await db.users.where('email').equals(user_email).count();
    return count > 0
  }

  async rightPassword(user_email: string, user_password: string): Promise<boolean> {
    const user = await db.users.where('email').equals(user_email).first();
    if (!user) {
      return false;
    }
    return user.password === user_password;
  }
  
  async getUserByEmail(email: string) {
    return await db.users.where('email').equals(email).first();
  }

}
