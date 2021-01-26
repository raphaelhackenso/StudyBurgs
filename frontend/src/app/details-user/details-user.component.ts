import { Component, OnInit } from '@angular/core';
import {StudyBurgsUser, StudyburgsUserService} from "../services/studyburgsUser.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../services/person.service";
import {Learned, LearnedService} from "../services/learned.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {
  user: StudyBurgsUser;
  learneds: Learned[];

  constructor(private router: Router, private personService: PersonService, private route: ActivatedRoute, public studyburgsUserService: StudyburgsUserService,
              public learnedService: LearnedService) { }

  displayedColumns = ['state', 'learned_person', 'learned_for_user',];

  ngOnInit(): void {

    this.studyburgsUserService.getCurrentUser()
      .subscribe(curUser => {
        this.user = curUser;
      });

    this.learnedService.retrieveLearneds()
      .pipe(map(response => response.filter(ele => ele.state == true)))
      .subscribe((filteredResponse) =>{
        this.learneds = filteredResponse;
        console.log(filteredResponse);
      })
  }

}
