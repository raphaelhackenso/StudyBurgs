import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Marriage {
  pk: number;
  //wife: ### TODO ###;
  //husband: ### TODO ###;
  date_of_marriage: Date;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarriageService {

  constructor(private http: HttpClient) {
  }

  retrieveMarriages(): Observable<Marriage[]> {
    return this.http.get<Marriage[]>('/api/marriages/');
  }
}
