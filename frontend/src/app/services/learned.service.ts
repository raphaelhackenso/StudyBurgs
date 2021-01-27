import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "./person.service";
import {StudyBurgsUser} from "./studyburgsUser.service";

export interface Learned {
  pk: number;
  state: boolean;
  learned_person: number;
  learned_for_user: number;

}

@Injectable({
  providedIn: 'root'
})
export class LearnedService {

  constructor(private http: HttpClient) {
  }

  retrieveLearneds(): Observable<Learned[]> {
    return this.http.get<Learned[]>('/api/learneds/');
  }

  createLearned(learned: Learned): Observable<Learned> {
    return this.http.post<Learned>('/api/learneds/', learned);
  }

  updateLearned(learned: Learned): Observable<any> {
    return this.http.patch('/api/learneds/' + learned.pk + '/', learned);
  }

}
