import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/services/Authorization/auth.service';
import { Router } from '@angular/router';
import { CommonConstants } from 'src/app/constants/constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.configForm();
  }


  login($event) {

    const username = this.user.get('Username').value;
    const password = this.user.get('Password').value;

    this.authService.getUserAuthentication(username, password).subscribe((data: any) => {
      localStorage.setItem(CommonConstants.token.usersTokenConstant, data.access_token);
      localStorage.setItem(CommonConstants.user.userRolesKeyConstant, data.roles);
      this.router.navigate(['home']);
    });
  }

  private configForm() {
    this.user = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }


}
