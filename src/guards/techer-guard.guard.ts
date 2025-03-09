import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';

export const techerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
    if (sessionStorage.getItem('role') === 'teacher') { 
      return true; 
    } else {
      router.navigate(['/courses']); 
      return false;
    }
  };
