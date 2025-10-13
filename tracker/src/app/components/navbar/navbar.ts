import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  logout(): void {
    this.authService.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

}
