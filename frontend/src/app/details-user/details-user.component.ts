import {Component, OnInit} from '@angular/core';
import {StudyBurgsUser, StudyburgsUserService} from "../services/studyburgsUser.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Person, PersonService} from "../services/person.service";
import {Learned, LearnedService} from "../services/learned.service";
import {map} from "rxjs/operators";
import {StudentLearneds} from "../services/student-learneds";
import {forkJoin} from "rxjs";
import {Note, NotesService} from "../services/notes.service";
import {Habsburgsnotes} from "../services/habsburgsnotes";
import {JSDocTagName} from "@angular/compiler/src/output/output_ast";

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
  habsburgsNotes: Habsburgsnotes[] = [];


  constructor(private router: Router, private personService: PersonService, private route: ActivatedRoute, public studyburgsUserService: StudyburgsUserService,
              public learnedService: LearnedService, public notesService: NotesService) {
  }


  ngOnInit(): void {

    this.studyburgsUserService.getCurrentUser()
      .subscribe((ele) => {
        this.user = ele;
      });

    forkJoin({
      requestPersons: this.personService.getPersons(),
      requestCurUser: this.studyburgsUserService.getCurrentUser(),

      // Only notes that belong to the current user
      requestNotes: this.notesService.getNotes()
        .pipe(map(notesResponse => notesResponse
          .filter(note => note?.note_for_user == this.studyburgsUserService.getCurrentUserID())
          .sort((a, b) => a.note_for_person - b.note_for_person))),

      // Only learned habsburgs that the current user has already learned
      requestLearneds: this.learnedService.retrieveLearneds()
        .pipe(map(learnedsResponse => learnedsResponse
          .filter(learned => learned?.state == true)
          .filter(filteredLearned => filteredLearned.learned_for_user == this.studyburgsUserService.getCurrentUserID()))),
    })
      .subscribe(({requestPersons, requestNotes, requestCurUser, requestLearneds}) => {
        this.learneds = requestLearneds;

        // Get the persons that the current user has already learned
        this.persons = requestLearneds.map(ele => requestPersons.filter(singlePerson => singlePerson.pk == ele.learned_person)[0]);

        // Custom Habsburgsnotes class containing the learned person and one corresponding note
        for (let singleNote of requestNotes) {
          this.habsburgsNotes.push(
            ({
              learned_habsburger: requestPersons
                .filter(singlePerson => singlePerson.pk == singleNote.note_for_person)[0]?.pk,
              notes: singleNote
            })
          );
        }

      });

  }


  deleteNote(note: Note): void {
    this.notesService.deleteNote(note)
      .subscribe(() => {
        alert('Note deleted successfully!');
        window.location.reload();
      });
  }

}
