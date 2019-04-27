import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/services/Authorization/auth.service';
import { Router } from '@angular/router';
import { CommonConstants } from 'src/app/constants/constants';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  public loading = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.configForm();
  }


  login($event) {

    const username = this.user.get('Username').value;
    const password = this.user.get('Password').value;

    this.loading = true;
    console.clear();
    
    this.authService.getUserAuthentication(username, password).subscribe((data: any) => {

      localStorage.setItem(CommonConstants.token.usersTokenConstant, data.access_token);
      localStorage.setItem(CommonConstants.user.userRolesKeyConstant, data.roles);

      this.loading = false;
      this.router.navigate(['home']);
    }, err => {
      this.loading = false;
      this.toastr.error('Something went wrong :(');
    });
  }

  private configForm() {
    this.user = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }


}
