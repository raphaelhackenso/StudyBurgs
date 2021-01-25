import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHabsburgComponent } from './add-habsburg.component';

describe('AddHabsburgComponent', () => {
  let component: AddHabsburgComponent;
  let fixture: ComponentFixture<AddHabsburgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHabsburgComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHabsburgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
