import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../services/person.service";
import {NotesService} from "../services/notes.service";
import {StudyburgsUserService} from "../services/studyburgsUser.service";

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  notesFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private notesService: NotesService,
              private personService: PersonService, private router: Router, private studyburgsUserService: StudyburgsUserService) {
  }

  ngOnInit(): void {

    const now = new Date();
    const defaultDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getDate() + 'T' + now.getHours() + ':' + ('0' + (now.getMinutes() + 1)).slice(-2);


    this.notesFormGroup = new FormGroup({
      pk: new FormControl(null),
      content: new FormControl(''),
      creation_date_time: new FormControl(defaultDate),
      note_for_user: new FormControl(this.studyburgsUserService.getCurrentUserID()),
      note_for_person: new FormControl(1), //TODO <- upate this to get the actual person
    });


    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.notesService.getNote(parseInt(pkFromUrl, 10))
        .subscribe((note) => {
          this.notesFormGroup.patchValue(note);
        });
    }

  }


  createOrUpdateNote(): void {
    console.log(this.notesFormGroup.value);
    const pkFromFormGroup = this.notesFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.notesService.updateNote(this.notesFormGroup.value)
        .subscribe(() => {
          alert('Note updated successfully!');
          this.router.navigate(['family']);
        });
    } else {
      this.notesService.createNote(this.notesFormGroup.value)
        .subscribe((note) => {
          alert('Note created successfully!');
          this.router.navigate(['family']);
        });
    }
  }


}
