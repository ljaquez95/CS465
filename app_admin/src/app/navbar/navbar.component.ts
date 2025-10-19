import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthenticationService) {}

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public onLogout(): void {
    this.authService.logout();
    window.location.href = '/'; 
  }
}
