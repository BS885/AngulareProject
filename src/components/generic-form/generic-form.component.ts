import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatCardModule],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() titleLabel: string = 'Title';
  @Input() contentLabel: string = 'Content';
  @Input() submitButtonLabel: string = 'Save';
  @Output() formSubmitted = new EventEmitter<any>();

  public itemForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.formSubmitted.emit(this.itemForm.value);
    }
  }
}
