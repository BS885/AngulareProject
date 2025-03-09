import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatToolbarModule,MatCardModule,MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) { }
  navigateTo() {
    this.router.navigate(["/login-and-register"]);
  }

}
