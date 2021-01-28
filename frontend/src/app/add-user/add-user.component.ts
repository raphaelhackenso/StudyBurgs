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
import {Person, PersonService} from "../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MarriageService} from "../services/marriage.service";
import {GenderService} from "../services/gender.service";
import {StudyburgsUserService} from "../services/studyburgsUser.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FooterRowOutlet} from "@angular/cdk/table";
import {GroupService} from "../services/group.service";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userFromGroup: FormGroup;

  constructor(private route: ActivatedRoute, private personService: PersonService, private router: Router,
              public studyburgsUserService: StudyburgsUserService, public groupService: GroupService) {
  }

  ngOnInit(): void {

    const now = new Date();
    const defaultDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getDate() + 'T' + now.getHours() + ':' + ('0' + (now.getMinutes() + 1)).slice(-2);


    this.userFromGroup = new FormGroup({
      pk: new FormControl(null),
      username: new FormControl('', Validators.required, this.uniqueUsernameValidator()),
      last_name: new FormControl(''),
      first_name: new FormControl(''),
      email: new FormControl(''),
      date_joined: new FormControl(defaultDate),
      groupsReference: new FormControl('student'),
      password: new FormControl(''),
    });


    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.studyburgsUserService.getStudyburgUser(parseInt(pkFromUrl, 10))
        .subscribe((user) => {
          this.userFromGroup.patchValue(user);
          console.log(user);
        });
    }

  }


  createOrUpdateUser(): void {
    const pkFromFormGroup = this.userFromGroup.value.pk;
    if (pkFromFormGroup) {
      this.studyburgsUserService.updateUser(this.userFromGroup.value)
        .subscribe(() => {
          alert('user updated successfully!');
        });
    } else {
      this.studyburgsUserService.createStudyburgUser(this.userFromGroup.value)
        .subscribe((user) => {
          alert('user created successfully!');
          this.router.navigate(['/family']);
        });
    }
  }


  private uniqueUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

      const currentPk = this.userFromGroup.controls.pk.value;
      const currentUsername = control.value;
      const pkFromUrl = this.route.snapshot.paramMap.get('pk');


      return this.studyburgsUserService.getStudyburgUsers()
        .pipe(
          map((users) => {

            const usersWithSameUsername = users.find((user) => {
              return user.username === currentUsername && user.pk !== currentPk;
            });

            return usersWithSameUsername ? {usernameAlreadyExist: true} : null;
          })
        );
      
    }
  }

}
