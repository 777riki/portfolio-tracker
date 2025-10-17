import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  logout(): void {
    this.authService.isLoggedIn.set(false);
    this.authService.userID.set(undefined);
    this.router.navigate(['/login']);
  }

}
