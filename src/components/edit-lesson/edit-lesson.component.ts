import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../models/lesson';
import { LessonsService } from '../../services/lessons.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [GenericFormComponent, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule,MatCardModule],
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  @Input() lesson!: Lesson;
  @Input() courseID!: string;
  @Output() lessonUpdated = new EventEmitter<Lesson>(); // פלט: השיעור המעודכן

  constructor(
    private lessonsService: LessonsService,
    public dialogRef: MatDialogRef<EditLessonComponent>
  ) { }

  ngOnInit(): void { }

  onFormSubmit(lessonData: any): void {
    console.log('Lesson data:', lessonData);
    const updatedLesson: Lesson = {
      ...this.lesson,
      title: lessonData.title,
      content: lessonData.content
    };
    this.lessonsService.updateLesson(this.courseID, updatedLesson).subscribe(
      (response) => {
        console.log('Lesson updated successfully', response);
        this.lessonUpdated.emit(updatedLesson);
        this.dialogRef.close(updatedLesson); // סגירת הדיאלוג
      },
      (error) => {
        console.error('Error updating lesson', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}