import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;

  constructor(private authService: AuthService) {
    // this._authService
  }

  ngOnInit() {
    this.configForm();
  }


  login($event) {

    const username = this.user.get('Username').value;
    const password = this.user.get('Password').value;

    this.authService.getUserAuthentication(username, password).subscribe((data: any) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', data);
    });
  }

  private configForm() {
    this.user = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }


}
