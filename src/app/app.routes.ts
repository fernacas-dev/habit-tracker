import { Routes } from '@angular/router';
import { HabitsComponent } from './components/habits/habits.component';
import { userLoggedGuard } from './guards/user-logged.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: HabitsComponent,
    canActivate: [userLoggedGuard]
  },
  {
    path: '**',
    redirectTo: 'chat',
  }
];
