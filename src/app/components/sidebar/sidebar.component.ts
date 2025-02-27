import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule,
    MatSidenavModule,RouterOutlet,MatListModule,MatIconModule,MatToolbarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
