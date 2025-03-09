import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonToCourseComponent } from './add-lesson-to-course.component';

describe('AddLessonToCourseComponent', () => {
  let component: AddLessonToCourseComponent;
  let fixture: ComponentFixture<AddLessonToCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLessonToCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLessonToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
