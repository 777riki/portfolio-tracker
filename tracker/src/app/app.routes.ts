import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { Mercato } from './components/mercato/mercato';
import { Transazioni } from './components/transazioni/transazioni';
import { Profilo } from './components/profilo/profilo';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'dashboard', component: Dashboard},
    {path: 'mercato', component: Mercato},
    {path: 'transazioni', component: Transazioni},
    {path: 'profilo', component: Profilo},
];
