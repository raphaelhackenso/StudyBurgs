import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Learned {
  pk: number;
  state: boolean;
  //learnedperson: ## todoo ##;
  //learnedforuser:## todoo ##;

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
}
