import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  genderNames = {f: 'Female', m: 'Male'};

  constructor() { }
}
