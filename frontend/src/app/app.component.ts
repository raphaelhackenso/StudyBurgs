import {Component, OnInit} from '@angular/core';
import {PersonService} from "./services/person.service";
import {LearnedService} from "./services/learned.service";
import {StudyburgsUserService} from "./services/studyburgsUser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'frontend';
  isLoggedIn = false;



  constructor(public personService: PersonService, public learnedService: LearnedService, public studyburgsUserService: StudyburgsUserService) {

  }

  ngOnInit(): void {
    this.studyburgsUserService.isLoggedIn
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

}
