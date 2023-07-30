// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from './auth.service';

// export { CanActivate } from '@angular/router'

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) { }
//   CanActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.authService.isAuth()) {
//       return true;
//     } else {
//       this.router.navigate(['/login'])
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivate,  CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login'])
    }
    throw new Error('Method not implemented.');
  }
  // CanActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (this.authService.isAuth()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login'])
  //   }
  // }
}
