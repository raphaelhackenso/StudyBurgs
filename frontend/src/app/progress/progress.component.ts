import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {PersonService} from "../services/person.service";
import {LearnedService} from "../services/learned.service";
import {StudyburgsUserService} from "../services/studyburgsUser.service";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  progress: number;
  //isLoggedIn = false;

  constructor(public personService: PersonService, public learnedService: LearnedService, public studyburgsUserService: StudyburgsUserService) {

  }

  ngOnInit(): void {
    /*
    this.studyburgsUserService.isLoggedIn
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        console.log(isLoggedIn);
      });

     */

    this.displayProgress();
  }

  displayProgress(): void {
    this.studyburgsUserService.getCurrentUser()?.subscribe((curUser) => {
      this.progress = curUser.progress;
      console.log("my Progess:" + curUser.progress);
    });

  }


}
