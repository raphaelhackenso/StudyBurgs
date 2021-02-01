import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupNames = {Admin: 'Admin', Teacher: 'Teacher', Student: 'Student'};

  constructor() { }
}
