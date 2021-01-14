import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Person, PersonService} from "../services/person.service";
import {MatGridListModule} from '@angular/material/grid-list';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  habsburg: Person;


  constructor(private router: Router, private personService: PersonService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.personService.getPerson(parseInt(pkFromUrl, 10))
        .subscribe((person) => {
          this.habsburg = person;
        });

    }




  }
}
