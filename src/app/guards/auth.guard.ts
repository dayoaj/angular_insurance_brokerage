import { CanActivateFn, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { filter, take, map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let isAuth;
  runInInjectionContext(inject(EnvironmentInjector), () => {
    isAuth = inject(AuthService).currentUser.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          return false;
        }
      })
    );
  });

  if (!isAuth) {
    // createUrlTreeFromSnapshot(route, ['/', { queryParams: { returnUrl: state.url } }]);
    return createUrlTreeFromSnapshot(route, ['/']);
  } else {
    return true;
  }
  // inject(EnvironmentInjector).runInContext(() => {
  //   inject(AuthService).currentUser.pipe(
  //     filter((val) => val !== null),
  //     take(1),
  //     map((isAuthenticated) => {
  //       if (isAuthenticated) {
  //         return true;
  //       } else {
  //         return inject(Router).createUrlTree(['/']);
  //       }
  //     })
  //   );
  // });
  // createUrlTreeFromSnapshot(route, [state.url]);


};
