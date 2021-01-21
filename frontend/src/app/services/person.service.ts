import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Person {
  pk: number;
  first_name: string;
  ordinal_number: string;
  name_suffix: string;
  date_of_birth: Date;
  date_of_death: Date;
  birthplace: string;
  description: string;
  gender: 'm' | 'f';
  picture_url: string;
  habsburg_ancestor: Person;

}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('/api/persons/');
  }

  deletePerson(person: Person): Observable<any> {
    return this.http.delete('/api/persons/' + person.pk + '/');
  }

  getPerson(pk: number): Observable<Person> {
    return this.http.get<Person>('/api/persons/' + pk + '/');
  }
}
