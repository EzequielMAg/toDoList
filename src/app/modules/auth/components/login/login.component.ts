import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public email: string = '';
  public password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  public initSession() {

    this.apiService.getToAuth(this.email, this.password).subscribe({

      next: (result) => {
        if(result.length === 1) {
          this.router.navigate(["/main"]);
        }
      },
      error: (error) => console.log(error)
    });
  }







}
