import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StudyburgsUserService} from '../services/studyburgsUser.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  isLoggedIn = false;

  constructor(private router: Router,
              private userService: StudyburgsUserService) {
  }

  ngOnInit(): void {
    this.userService.isLoggedIn
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  logout(): void {
    this.userService.logout();
  }
}
