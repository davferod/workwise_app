import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '@shared/services/token.service';

export const redirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const isValidToken = tokenService.isValidToken();
  if (isValidToken) {
    router.navigate(['/app']);
  }
  return true;
};
