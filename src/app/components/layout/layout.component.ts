import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authorization/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  userClaims: any;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getUserClaims();
  }

  getUserClaims() {
    this.authService.getCurrentUser();
  }
}
