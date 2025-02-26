import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginAndRegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CourseOnlineClient';
}
