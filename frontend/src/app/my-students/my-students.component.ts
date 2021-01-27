import { Component, OnInit } from '@angular/core';
import {StudyBurgsUser, StudyburgsUserService} from "../services/studyburgsUser.service";

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit {

  constructor(public studyburgsUserService: StudyburgsUserService) { }

  ngOnInit(): void {
    this.studyburgsUserService.getCurrentUser()
      .subscribe((curUser) =>{

      })
  }

}
