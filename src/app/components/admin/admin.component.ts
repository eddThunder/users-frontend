import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/Authorization/auth.service';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('modal') modal: UserModalComponent;

  allRoles: any;
  usersList: any;
  selectedUser: User;
  loggedUser: any;

  showmodal = true;
  showDialog = false;

  loading = false;

  constructor(private roleService: RolesService,
              private usersService: UserService,
              private toastr: ToastrService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.roleService.getAllRoles().subscribe(data => {
      this.allRoles = data;
    });

    this.loggedUser = this.authService.getCurrentUser();

    this.getUsersList();
  }

  getUsersList() {
    this.usersService.getAllUsers().subscribe((data: User[]) => {
      this.usersList = data;
    });
  }

  getUser(id: number) {
    this.loading = true;
    this.usersService.getUserById(id).subscribe((data: User ) => {
      this.selectedUser = data;

      this.modal.configModalForm(this.selectedUser);

      this.showDialog = true;
    });
  }

  deleteUser(id: number) {

    if (confirm('Are you sure to delete this user?')) {

      this.loading = true;

      this.usersService.deleteUser(id).subscribe(data => {

        this.toastr.success('User deleted successfully');
        this.getUsersList();
        this.loading = false;

      }, err => {
        this.loading = false;
        this.toastr.error('Something went wrong deleting the user');
      });

    }
  }

  allowedToOperate(userId: number): boolean {
    return userId === this.loggedUser.Id;
  }

  update() {
    // const username = this.selectedUser.get('Username').value;
    // const password = this.selectedUser.get('Password').value;
  }
}
