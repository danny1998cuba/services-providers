import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NoAuthenticatedGuard } from './guards/no_authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent,
        canActivate: [NoAuthenticatedGuard]
    },
    {
        path: 'providers',
        component: ProvidersListComponent,
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: '/providers',
        pathMatch: 'full'
    },
];
