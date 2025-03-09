import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,  
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string='';
  shawnRegisterButton: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit() {}
  getEmailErrorMessage() {
    const emailControl = this.loginForm.controls['email'];
    if (emailControl.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl.hasError('email')) {
      return 'Enter a valid email';
    }
    return '';
  }

  getPasswordErrorMessage() {
    const passwordControl = this.loginForm.controls['password'];
    if (passwordControl.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response: any) => {
          this.snackBar.open('התחברת בהצלחה ', 'סגור', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
            });
            this.router.navigate(["/courses"]);
            this.shawnRegisterButton=false;
        },
        (error: any) => {
          console.error('Login failed', error);
          this.snackBar.open(error.error.message || 'An error occurred. Please try again.', 'סגור', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.shawnRegisterButton=true;
        }
      );
    }
  }
  navigateTo(){
    this.errorMessage = '';
    this.loginForm.reset();
    this.router.navigate(["/register"]);
  }
}


