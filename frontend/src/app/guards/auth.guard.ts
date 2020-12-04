import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StudyburgsUserService} from '../services/studyburgsUser.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: StudyburgsUserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isLoggedIn
      .pipe(
        map((isLoggedIn) => {

          if (!isLoggedIn) {
            this.router.navigate(['login']);
          }

          return isLoggedIn;
        })
      );
  }

}
