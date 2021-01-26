import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "./person.service";
import {StudyBurgsUser} from "./studyburgsUser.service";

export interface Note {
  pk: number;
  content: string;
  creation_date_time: Date;
  note_for_user: StudyBurgsUser;
  note_for_person: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes/');
  }

  getNote(pk: number): Observable<Note> {
    return this.http.get<Note>('/api/notes/' + pk + '/');
  }

  updateNote(note: Note): Observable<any> {
    return this.http.patch('/api/notes/' + note.pk + '/', note);
  }


  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>('/api/notes/', note);
  }

}
