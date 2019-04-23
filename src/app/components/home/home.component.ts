import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthService } from 'src/app/services/Authorization/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userClaims: any;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getUserClaims();
  }

  getUserClaims() {
    this.authService.getUserClaims().subscribe(data => {
      this.userClaims = data;
      console.log(this.userClaims);
    });
  }

   logOut() {
     this.authService.logout();
   }

}
