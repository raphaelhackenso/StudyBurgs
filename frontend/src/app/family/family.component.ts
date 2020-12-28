import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person, PersonService} from '../services/person.service';
import {INode} from 'ngx-org-chart/lib/node';


@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  constructor(private personService: PersonService) {

  }

  persons: Person[];
  displayedColumns = ['first_name', 'ordinal_number', 'name_suffix', 'date_of_birth', 'date_of_death', 'habsburg_ancestor',];


  ngOnInit(): void {
    this.retrievePersons();
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

  createFamilyTree(inputList: Person[]) {

    var rawNodes = inputList.filter(ele => ele.name_suffix !== 'Stephan von Lothringen').map(person => ({
      pk: person.pk,
      ancestor: person.habsburg_ancestor,
      name: person.first_name + ' ' + (person.ordinal_number != null ? person.ordinal_number : '') +
        ' ' + (person.name_suffix != null ? person.name_suffix : ''),
      cssClass: 'ngx-org-ceo',
      image: '',
      title: person.date_of_birth + ' - ' + person.date_of_death,
      childs: []
    }));


    var sortedNodes = rawNodes.sort((a, b): number => {
      if (a.ancestor < b.ancestor) return -1;
      if (a.ancestor > b.ancestor) return 1;
      return 0
    });

    return this.getNestedChildren(sortedNodes, null);

  }


  getNestedChildren(models, parentId) {
    const nestedTreeStructure = [];
    const length = models.length;

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

  test($event: INode): void {
    alert(JSON.stringify($event));
  }
}

/* unused functional programming
groupByAncestor(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
*/

