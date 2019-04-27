import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allRoles: any;
  usersList: any;

  selectedUser: User;


  showmodal = true;
  showDialog = false;

  loading = false;

  constructor(private roleService: RolesService, private usersService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.roleService.getAllRoles().subscribe(data => {
      this.allRoles = data;
    });

    this.usersService.getAllUsers().subscribe((data: User[]) => {
      this.usersList = data;
    });
  }

  getUser(id: number) {
    this.loading = true;
    this.usersService.getUserById(id).subscribe((data: User ) => {
      this.selectedUser = data;
      this.showDialog = true;
    });
  }

  update() {
    // const username = this.selectedUser.get('Username').value;
    // const password = this.selectedUser.get('Password').value;
  }
}
