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

  constructor(private roleService: RolesService, private fb: FormBuilder) {
    this.rolesList = [];
   }

  ngOnInit() {

    this.getRolesList().then(data => {
      this.rolesList = data;
      this.configModalForm(this.selectedUser);
    });


    if (this.selectedUser !== null) {
        // this.loadDataForEdit(this.selectedUser);
      } else {
        // New user... get the form fata and call userService to add a new user
        // create
      }
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
}
