import {Component, OnInit} from '@angular/core';


import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import {ActivatedRoute, Router} from "@angular/router";
import {Person, PersonService} from "../services/person.service";
import {MatGridListModule} from '@angular/material/grid-list';
import {StudyburgsUserService} from "../services/studyburgsUser.service";
import {Learned, LearnedService} from "../services/learned.service";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {filter, map} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {ProgressComponent} from "../progress/progress.component";
import {NotesService} from "../services/notes.service";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  habsburg: Person;
  learnedFormGroup: FormGroup;
  learnedHabsburg: Learned;


  constructor(private router: Router, private personService: PersonService, private route: ActivatedRoute, public studyburgsUserService: StudyburgsUserService,
              public learnedService: LearnedService, public notesService: NotesService) {
  }

  ngOnInit(): void {

    this.learnedFormGroup = new FormGroup({
      pk: new FormControl(null),
      state: new FormControl(false),
      learned_person: new FormControl(this.route.snapshot.paramMap.get('pk')),
      learned_for_user: new FormControl(this.studyburgsUserService.getCurrentUserID()),
    });


    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.personService.getPerson(parseInt(pkFromUrl, 10))
        .subscribe((person) => {
          this.habsburg = person;
        });
    }

    this.learnedService.retrieveLearneds()
      .pipe(map(learnedsResponse => learnedsResponse
        .filter(learned => learned.learned_person == parseInt(pkFromUrl, 10)
          && learned.learned_for_user == this.studyburgsUserService.getCurrentUserID())[0]))
      .subscribe((learneds) => {
        if (learneds != null) {
          this.learnedFormGroup.patchValue(learneds);
          this.learnedHabsburg = learneds;
        }

      });

  }


  createOrUpdateLearned(): void {
    const pkFromFormGroup = this.learnedFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.learnedService.updateLearned(this.learnedFormGroup.value)
        .subscribe(() => {
          alert('updated successfully!');
          this.recalculateProgress();
        });
    } else {
      this.learnedService.createLearned(this.learnedFormGroup.value)
        .subscribe((learned) => {
          alert('created successfully!');
          this.recalculateProgress();
          this.router.navigate(['/']);
        });
    }
  }

  recalculateProgress(): void {
    forkJoin({
      requestMyLearneds: this.learnedService.retrieveLearneds()
        .pipe(map(learnedsResponse => learnedsResponse
          .filter(learned => learned.state == true && learned.learned_for_user == this.studyburgsUserService.getCurrentUserID()))),
      requestPersons: this.personService.getPersons(),
      requestCurrentUser: this.studyburgsUserService.getCurrentUser(),
    })
      .subscribe(({requestMyLearneds, requestPersons, requestCurrentUser}) => {
        var newProgress = Math.round((requestMyLearneds.length / requestPersons.length) * 100 * 100) / 100;
        requestCurrentUser.progress = newProgress;
        console.log('myProgress ' + newProgress + '%');
        //console.log(requestCurrentUser);

        this.studyburgsUserService.updateStudyBurgsUser(requestCurrentUser)
          .subscribe((response) => {
            console.log("Progess Updated");
            window.location.reload()
          })

      });
  }


}
