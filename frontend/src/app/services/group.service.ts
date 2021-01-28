import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupNames = {Admins: 'Admins', Teacher: 'Teacher', student: 'student'};

  constructor() { }
}
