import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person, PersonService} from '../services/person.service';
import {INode} from 'ngx-org-chart/lib/node';
import {Router} from "@angular/router";
import {StudyburgsUserService} from "../services/studyburgsUser.service";
import {Learned, LearnedService} from "../services/learned.service";
import {map} from "rxjs/operators";

//import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  persons: Person[];
  learneds: Learned[];


  constructor(private personService: PersonService, private router: Router,
              private studyburgsUserService: StudyburgsUserService, private learnedService: LearnedService) {

  }


  ngOnInit(): void {
    this.retrievePersons();

    this.learnedService.retrieveLearneds()
      .pipe(map(learnedResponse => learnedResponse
        .filter(learned => learned.learned_for_user == this.studyburgsUserService.getCurrentUserID())
        .filter((filtertedLearned => filtertedLearned.state == true))))
      .subscribe((ele) => {
        this.learneds = ele;
      });


  }


  private retrievePersons(): void {
    this.personService.getPersons()
      .subscribe((persons) => {
        this.persons = persons;
      });
  }


  deletePerson(person: Person): void {
    this.personService.deletePerson(person)
      .subscribe(() => {
        this.retrievePersons();
        alert('deleted successfully!');
      });
  }

  createFamilyTree(inputList: Person[]) {

    var rawNodes = inputList?.map(person => ({
      pk: person.pk,
      ancestor: person.habsburg_ancestor,
      name: person.first_name + ' ' + (person.ordinal_number != null ? person.ordinal_number : '') +
        ' ' + (person.name_suffix != null ? person.name_suffix : ''),
      cssClass: this.learneds?.filter(singleLearned => singleLearned.learned_person == person.pk).length > 0 ? 'ngx-org-learned' : 'ngx-org-standard',
      image: '',
      title: person.date_of_birth + ' - ' + person.date_of_death,
      childs: []
    }));


    var sortedNodes = rawNodes?.sort((a, b): number => {
      if (a.ancestor < b.ancestor) return -1;
      if (a.ancestor > b.ancestor) return 1;
      return 0
    });

    return this.getNestedChildren(sortedNodes, null);

  }


  getNestedChildren(models, parentId) {
    const nestedTreeStructure = [];
    const length = models?.length;

    for (let i = 0; i < length; i++) {
      const model = models[i];

      if (model.ancestor == parentId) {
        const children = this.getNestedChildren(models, model.pk);

        if (children.length > 0) {
          model.childs = children;
        }

        nestedTreeStructure.push(model);
      }
    }

    return nestedTreeStructure;
  }

  getPersonNotePk($event: any): void {
    // alert(JSON.stringify($event.pk));
    this.router.navigate(['/details/' + $event.pk]);
  }
}

/* unused functional programming
groupByAncestor(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj)
    return acc;
  }, {});
}
*/
