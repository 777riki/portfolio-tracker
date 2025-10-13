import Dexie, { Table } from 'dexie';

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    date_created: Date;
}

export class AppDatabase extends Dexie {
    users!: Table<User, number>;

    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            users: '++id, name, email, password, date_created'
        });
    }
}

export const db = new AppDatabase();
