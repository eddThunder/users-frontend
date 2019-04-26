import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesService } from 'src/app/services/roles/roles.service';
import { Role } from 'src/app/models/Role';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
  @Input() selectedUser: any;


  userForm: FormGroup;
  roles: Role[];

  constructor(private roleService: RolesService) {
   }

  ngOnInit() {
    this.configForm();
    this.getRolesList();
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
     this.roles = data;
     console.log(this.roles);
    });
  }

  private configForm() {
    this.userForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }

}
