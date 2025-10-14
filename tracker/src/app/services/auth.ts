import { Injectable, signal, WritableSignal } from '@angular/core';
import { db } from '../app.database';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);
  userID: WritableSignal<number | undefined> = signal<number | undefined>(undefined);

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

  async getUserByEmail(user_email: string) {
    return await db.users.where('email').equals(user_email).first();
  }

  async getUserByID(user_id: number) {
    return await db.users.where('id').equals(user_id).first();
  }

  async updateUserData(user_name: string, user_email: string, user_password: string) {
    const id = this.userID();
    if (!id) {
      return;
    }
    await db.users.update(id, { name: user_name, email: user_email, password: user_password });
  }

  async deleteUserByID() {
    const id = this.userID();
    if (!id) {
      return;
    }
    await db.users.delete(id);
  }

}
