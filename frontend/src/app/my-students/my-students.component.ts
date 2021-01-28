import {Component, OnInit} from '@angular/core';
import {StudyBurgsUser, StudyburgsUserService} from "../services/studyburgsUser.service";
import {filter, map} from "rxjs/operators";
import {Learned, LearnedService} from "../services/learned.service";
import {StudentLearneds} from "../services/student-learneds";
import {forkJoin} from "rxjs";
import {Person, PersonService} from "../services/person.service";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit {

  students: StudyBurgsUser[];
  learneds: Learned[];
  persons: Person[];
  studentslearned: StudentLearneds[] = [];
  fileName = 'StudentsProgress.xlsx';
  math = Math;


  constructor(public studyburgsUserService: StudyburgsUserService, public learnedService: LearnedService,
              public personService: PersonService) {
  }

  ngOnInit(): void {

    this.studyburgsUserService.getStudyburgUsers()
      .subscribe((response) =>{
        console.log(response);
      })

    this.studyburgsUserService.getStudyburgUsers()
      .pipe(map(usersResponse => usersResponse
        .filter(user => user.groupsReference == 'student')))
      .subscribe((filteredStudents) => {
        this.students = filteredStudents;
      });


    forkJoin({
      requestPersons: this.personService.getPersons(),
      requestStudents: this.studyburgsUserService.getStudyburgUsers()
        .pipe(map(usersResponse => usersResponse
          .filter(user => user?.groupsReference == 'student'))),
      requestLearneds: this.learnedService.retrieveLearneds()
        .pipe(map(learnedsResponse => learnedsResponse
          .filter(learned => learned?.state == true))),
    })
      .subscribe(({requestPersons, requestStudents, requestLearneds}) => {
        this.learneds = requestLearneds;
        this.persons = requestPersons;
        this.students = requestStudents;


        for (let singleStudentLearned of requestLearneds) {
          var tmpLearnedHabsburger = requestPersons.filter(singlePerson => singlePerson.pk == singleStudentLearned.learned_person)[0];
          var tmpOrdinalNumber = '';

          if (tmpLearnedHabsburger?.ordinal_number != null) {
            tmpOrdinalNumber = tmpLearnedHabsburger.ordinal_number;
          }

          this.studentslearned.push(
            ({
              learned_habsburger: tmpLearnedHabsburger?.first_name + ' ' + tmpOrdinalNumber,
              student: requestStudents.filter(singleStudent => singleStudent.pk == singleStudentLearned.learned_for_user)[0]?.username
            })
          );
        }

      });

  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


}

