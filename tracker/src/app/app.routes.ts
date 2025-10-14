import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { Mercato } from './components/mercato/mercato';
import { Transazioni } from './components/transazioni/transazioni';
import { Profilo } from './components/profilo/profilo';
import { Login } from './components/login/login';
import { Forgot } from './components/forgot/forgot';
import { Signup } from './components/signup/signup';
import { Delete } from './components/delete/delete';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'dashboard', component: Dashboard},
    {path: 'mercato', component: Mercato},
    {path: 'transazioni', component: Transazioni},
    {path: 'profilo', component: Profilo},
    {path: 'login', component: Login},
    {path: 'forgot', component: Forgot},
    {path: 'signup', component: Signup},
    {path: 'delete/:id', component: Delete},
];
