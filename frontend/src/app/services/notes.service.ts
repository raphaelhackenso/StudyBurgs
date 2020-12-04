import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Note {
  pk: number;
  content: string;
  creation_date_time: Date;
  //note_for_user = ##TODO;
  //note_for_person = ## TODO;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
  }

  retrieveNote(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes/');
  }
}
