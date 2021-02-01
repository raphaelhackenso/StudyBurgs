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

import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Person, PersonService} from '../services/person.service';
import {MarriageService} from '../services/marriage.service';
import {GenderService} from '../services/gender.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-add-habsburg',
  templateUrl: './add-habsburg.component.html',
  styleUrls: ['./add-habsburg.component.scss']
})
export class AddHabsburgComponent implements OnInit {

  habsburgFormGroup: FormGroup;
  ancestorOptions: Person[];

  constructor(private route: ActivatedRoute, private marriageService: MarriageService,
              private personService: PersonService, private router: Router, public genderService: GenderService) {
  }

  ngOnInit(): void {

    const now = new Date();

    const defaultDate = 1700 + '-' + 1 + '-' + 1;

    this.habsburgFormGroup = new FormGroup({
      pk: new FormControl(null),
      first_name: new FormControl(''),
      ordinal_number: new FormControl(''),
      name_suffix: new FormControl(''),
      date_of_birth: new FormControl(defaultDate),
      date_of_death: new FormControl(defaultDate),
      birthplace: new FormControl(''),
      description: new FormControl(''),
      gender: new FormControl('m'),
      picture_url: new FormControl(null),
      habsburg_ancestor: new FormControl(null)
    });


    this.personService.getPersons()
      .subscribe((personOptions) => {
        this.ancestorOptions = personOptions;
      });


    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.personService.getPerson(parseInt(pkFromUrl, 10))
        .subscribe((person) => {
          this.habsburgFormGroup.patchValue(person);
        });
    }


  }


  createOrUpdateHabsburg(): void {
    const pkFromFormGroup = this.habsburgFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.personService.updatePerson(this.habsburgFormGroup.value)
        .subscribe(() => {
          alert('Habsburg updated successfully!');
          this.router.navigate(['/details/' + this.habsburgFormGroup.value.pk]);
        });
    } else {
      this.personService.createPerson(this.habsburgFormGroup.value)
        .subscribe((person) => {
          alert('Habsburg created successfully!');
          this.router.navigate(['/details/' + person.pk]);
        });
    }
  }

}
