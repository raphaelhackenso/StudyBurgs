import {Component, OnInit} from '@angular/core';
import {StudyBurgsUser, StudyburgsUserService} from "../services/studyburgsUser.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Person, PersonService} from "../services/person.service";
import {Learned, LearnedService} from "../services/learned.service";
import {map} from "rxjs/operators";
import {StudentLearneds} from "../services/student-learneds";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {
  user: StudyBurgsUser;
  learneds: Learned[];
  persons: Person[];
  studentslearned: StudentLearneds[];


  constructor(private router: Router, private personService: PersonService, private route: ActivatedRoute, public studyburgsUserService: StudyburgsUserService,
              public learnedService: LearnedService) {
  }

  displayedColumns = ['student', 'learned_habsburger',];

  ngOnInit(): void {

    this.studyburgsUserService.getCurrentUser()
      .subscribe((ele) => {
        this.user = ele;
      });

    forkJoin({
      requestPersons: this.personService.getPersons(),
      requestUsers: this.studyburgsUserService.getStudyburgUsers(),
      requestLearneds: this.learnedService.retrieveLearneds()
        .pipe(map(learnedsResponse => learnedsResponse
          .filter(learned => learned?.state == true))),
    })
      .subscribe(({requestPersons, requestUsers, requestLearneds}) => {
        this.learneds = requestLearneds;
        this.persons = requestPersons;


        var allLearneds: StudentLearneds[] = requestLearneds.map(ele => ({
          learned_habsburger: requestPersons
            .filter(singlePerson => singlePerson.pk == ele.learned_person)[0].first_name + ' ' + requestPersons
            .filter(singlePerson => singlePerson.pk == ele.learned_person)[0]?.ordinal_number,
          student: requestUsers.filter(singleUser => singleUser.pk == ele.learned_for_user)[0].username
        }));
        //console.log(allLearneds);

        this.studentslearned = allLearneds;

      });


  }

}
