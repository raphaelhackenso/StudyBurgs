import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from "rxjs/operators";
import {Person} from "./person.service";

export interface StudyBurgsUser {
  pk: number;
  username: string;
  progress: number;
  last_name: string;
  first_name: string;
  email: string;
  date_joined: Date;
  groupsReference: string;


}

@Injectable({
  providedIn: 'root'
})
export class StudyburgsUserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }): void {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['family']);
      }, () => {
        alert('wrong username or password');
      });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
    window.location.reload()

  }

  hasNeededPermission(permission: string): boolean {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      const decodetToken = this.jwtHelperService.decodeToken(token);
      const permissions = decodetToken.permissions;
      return permission in permissions;
    }
  }


  getCurrentUser(): Observable<StudyBurgsUser> {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      const decodetToken = this.jwtHelperService.decodeToken(token);
      const decodetUserID = decodetToken.user_id;

      return this.http.get<StudyBurgsUser>('/api/StudyBurgUsers/' + decodetUserID + '/').pipe(
        map((user) => {
          return user;
        })
      )
    }
  }

  getCurrentUserID(): number {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      const decodetToken = this.jwtHelperService.decodeToken(token);
      return decodetToken.user_id;
    }
  }


  updateStudyBurgsUser(studyBurgsUser: StudyBurgsUser): Observable<any> {
    return this.http.patch('/api/StudyBurgUsers/' + this.getCurrentUserID() + '/', studyBurgsUser);
  }

  getStudyburgUsers(): Observable<StudyBurgsUser[]> {
    return this.http.get<StudyBurgsUser[]>('/api/StudyBurgUsers/');
  }


}
