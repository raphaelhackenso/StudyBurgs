import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentsComponent } from './my-students.component';

describe('MyStudentsComponent', () => {
  let component: MyStudentsComponent;
  let fixture: ComponentFixture<MyStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
