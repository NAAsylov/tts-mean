import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router
  ) {}

  canActivate(routeActivated: ActivatedRouteSnapshot) {
      const userRole = this.authenticationService.getRoleUser();
      const expectedRole = routeActivated.data.expectedRole;
      if (this.authenticationService.isLoggedIn()) {
        //if (userRole.user.role === 'Admin') {
        if (userRole.user.role === expectedRole) {
          return true;
        } else {
          return false;
        }
      } else {
        this.route.navigate(['/login']);
        return false;
      }
  }
}
