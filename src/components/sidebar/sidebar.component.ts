import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav'
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet,RouterLink,
    MatSidenavModule,MatListModule,MatIconModule,MatToolbarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: ActivatedRoute) { }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  isTeacher() {
    return sessionStorage.getItem('role') === 'teacher';
  }
}
