import { Routes } from '@angular/router';
import { userLoggedGuard } from './lib/auth/guards/user-logged.guard';
import { HabitsComponent } from '@habits/habits.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./lib/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: HabitsComponent,
    canActivate: [userLoggedGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];
