import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { User } from 'src/app/models/User';

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

  constructor() { }

  ngOnInit() { }

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

}
