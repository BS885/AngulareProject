import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule
      ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  roles = ['student', 'teacher', 'admin'];

  constructor(private fb: FormBuilder, private authService: AuthService,
    private snackBar: MatSnackBar,private router: Router
  ) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }
  getErrorMessage(field: string) {
    const control = this.registerForm.controls[field];
    if (control.hasError('required')) {
      return `${field} is required`;
    }
    if (control.hasError('minlength')) {
      return `${field} must be at least ${control.errors?.['minlength'].requiredLength} characters long`;
    }
    if (control.hasError('email')) {
      return 'Enter a valid email';
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register Data:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          this.snackBar.open('נרשמת בהצלחה', 'סגור', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
            });
          this.registerForm.reset();
          this.router.navigate(['login-and-register']);
        },
        (error: any) => {
          console.error('Registration failed', error);
          this.snackBar.open('שגיאה בהרשמה אנא נסה שוב', 'סגור', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
            });
          // this.errorMessage = ;
        }
      );
    }
  }
}