import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: 'providers',
        component: ProvidersListComponent
    },
    {
        path: '**',
        redirectTo: '/providers',
        pathMatch: 'full'
    },
];
