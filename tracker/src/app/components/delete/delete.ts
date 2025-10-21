import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-delete',
  imports: [RouterLink],
  templateUrl: './delete.html',
  styleUrl: './delete.css'
})
export class Delete implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  authService: Auth = inject(Auth);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  }

  async yes(): Promise<void> {
    await this.authService.deleteUserByID();
    this.router.navigate(['/trending']);
    this.authService.isLoggedIn.set(false);
    this.authService.userID.set(undefined);
  }

  no() {
    this.router.navigate(['/trending']);
  }

}
