import { Routes } from '@angular/router';
import { Trending } from './components/trending/trending';
import { Mercato } from './components/mercato/mercato';
import { Transazioni } from './components/transazioni/transazioni';
import { Profilo } from './components/profilo/profilo';
import { Login } from './components/login/login';
import { Forgot } from './components/forgot/forgot';
import { Signup } from './components/signup/signup';
import { Delete } from './components/delete/delete';
import { Coin } from './components/coin/coin';
import { Notfound } from './components/notfound/notfound';

export const routes: Routes = [
    {path: '', component: Trending},
    {path: 'trending', component: Trending},
    {path: 'coin/:nameid', component: Coin},
    {path: 'mercato', component: Mercato},
    {path: 'transazioni', component: Transazioni},
    {path: 'profilo', component: Profilo},
    {path: 'login', component: Login},
    {path: 'forgot', component: Forgot},
    {path: 'signup', component: Signup},
    {path: 'delete/:id', component: Delete},
    {path: '**', component: Notfound},
];
