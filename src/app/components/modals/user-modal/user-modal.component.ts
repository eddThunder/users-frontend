import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { User } from 'src/app/models/User';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RolesService } from 'src/app/services/roles/roles.service';
import { Role } from 'src/app/models/Role';
import * as _ from 'lodash';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class UserModalComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() selectedUser: User;


  userForm: FormGroup;
  rolesList: Role[];

  constructor(private roleService: RolesService, private fb: FormBuilder, private userService: UserService) {
    this.rolesList = [];
   }

  ngOnInit() {

    this.getRolesList().then(data => {
      this.rolesList = data;
      this.configModalForm(this.selectedUser);
    });
  }

  get roleControlArray(): FormArray {
    if (!this.userForm) { return; }

    return this.userForm.get('Roles') as FormArray;
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.selectedUser = null;
  }

  submitData() {
    const user = this.userForm.getRawValue();
    if (this.selectedUser) {
      // this.userService.updateUser(user);
      console.log('updating user...');
      user.Roles = this.filterSelectedRoles(user.Roles);
      console.log(user);
    } else {
      console.log('creating user...');
      user.Roles = this.filterSelectedRoles(user.Roles);
      console.log(user);
      // this.userService.createUser(user);
    }
  }

  private getRolesList(): Promise<any> {
    return this.roleService.getAllRoles().toPromise();
  }

  public configModalForm(selectedUser?: User) {
    this.userForm = this.fb.group({
      Username: [selectedUser ? selectedUser.UserName : '', [Validators.required]],
      Password: [selectedUser ? selectedUser.Password : '', [Validators.required]],
      Roles: this.mapToCheckboxArrayGroup(selectedUser)
    });
  }

  private mapToCheckboxArrayGroup(user?: User): FormArray {

    const fbList = [];

    this.rolesList.forEach(element => {
      fbList.push(this.fb.group({
        id: element.Id,
        roleName: element.RoleName,
        selected: user ? _.some(user.Roles, { Id: element.Id}) : false
      }));
    });

    return new FormArray(fbList);
  }

  private filterSelectedRoles(roles: Role[]) {
    const selectedRoles = _.filter(roles, {selected: true});
    return selectedRoles;
  }
}
