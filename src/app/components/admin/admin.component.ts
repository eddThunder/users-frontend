import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allRoles: any;
  usersList: any;

  selectedUser: any;


  showmodal = true;

  constructor(private roleService: RolesService, private usersService: UserService) { }

  ngOnInit() {
    this.roleService.getAllRoles().subscribe(data => this.allRoles = data);
    this.usersService.getAllUsers().subscribe(data => this.usersList = data);
  }

  getUser(id: number) {
    this.usersService.getUserById(id).subscribe(data => {
      this.selectedUser = data;
      console.log(this.selectedUser);
    });
  }
}
