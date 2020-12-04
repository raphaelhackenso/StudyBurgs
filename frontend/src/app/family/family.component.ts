import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person, PersonService} from "../services/person.service";


@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  persons: Person[];
  displayedColumns = ['first_name', 'ordinal_number', 'name_suffix', 'date_of_birth', 'date_of_death'];

  constructor(private personService: PersonService) {

  }

  ngOnInit(): void {
    this.retrievePersons()
  }


  private retrievePersons(): void {
    this.personService.getPersons()
      .subscribe((persons) => {
        this.persons = persons;
      });
  }


  deleteMovie(person: Person): void {
    this.personService.deletePerson(person)
      .subscribe(() => {
        this.retrievePersons();
        alert('deleted successfully!');
      });
  }

}
