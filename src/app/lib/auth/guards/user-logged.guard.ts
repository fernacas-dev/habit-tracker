import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const userLoggedGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn().pipe(tap((isLogged: boolean) => !isLogged ? router.navigateByUrl('/auth/login') : ''));
};
