import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RolesService } from 'src/app/services/roles/roles.service';
import { Role } from 'src/app/models/Role';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';


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
  roleStruct: any;

  constructor(private roleService: RolesService, private fb: FormBuilder) {

   }

  ngOnInit() {
    this.configForm();
    this.getRolesList();

    if (this.selectedUser !== null) {
      // call userService to modify a user
      // update
      } else {
        // New user... get the form fata and call userService to add a new user
        // create
      }
  }

  preSelecttUsersRoles() {

  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.selectedUser = null;
  }

  submitData() {
    if (this.selectedUser !== null) {
        // call userService to modify a user
        // update
    } else {
      // New user... get the form fata and call userService to add a new user
      // create
    }
  }

  private getRolesList() {
   this.roleService.getAllRoles().subscribe((data: Role[] ) => {
     this.rolesList = data;
    });
  }

  private configForm() {

    // const roleStruct: Role[] = [];

    // this.rolesList.forEach(role => {
    //   this.selectedUser.roles.forEach(userRole => {
    //      if (role.id === userRole.id) {
    //         roleStruct.push({roleName: role.roleName, id: role.id, selected: true });
    //      } else {
    //         roleStruct.push({roleName: role.roleName, id: role.id, selected: false });
    //      }
    //   });
    // });

    const rList = ['PAGE_1', 'PAGE_2', 'PAGE_3'];
    this.userForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Roles: this.mapToCheckboxArrayGroup(rList)
    });

  }

  private mapToCheckboxArrayGroup(data: string[]): FormArray {
    return this.fb.array(data.map((i) => {
      return this.fb.group({
        name: i,
        selected: false
      });
    }));
}

  get roleControlArray(): FormArray {
    if (!this.userForm) { return; }

    return this.userForm.get('Roles') as FormArray;
  }
}
