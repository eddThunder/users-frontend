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

   }

  ngOnInit() {

    this.configModalForm();
    this.getRolesList();


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

  private getRolesList() {
   this.roleService.getAllRoles().subscribe((data: Role[] ) => {
     this.rolesList = data;
    });
  }

  private configModalForm() {
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

  private loadDataForEdit(data: User): void {

    this.userForm.patchValue({
      Username: data.username,
      Password: data.password,
      Roles: this.prefillRoleSelection(this.userForm.get('roles').value, data.roles as Role[])
    });
  }

  private prefillRoleSelection(role, selectedRoles) {
    return role.map((i) => {
      if (selectedRoles.includes(i.name)) {
        i.selected = true;
      }

      return i;
    });
  }
}
