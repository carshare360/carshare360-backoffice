import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddBlacklistUserRequest } from 'src/app/interfaces/AddBlacklistUserRequest.interface';
import { User } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  @Output() userBlacklisted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    console.log(this.user);
  }
  @Input() user!: User;
  isExpanded: boolean = false;
  blackListConfirm: number = 0;
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }
  toggleBlacklistConfirm(i: number) {
    this.blackListConfirm = i;
    if (this.blackListConfirm == 2) {
      let req: AddBlacklistUserRequest = {
        email: this.user.email,
      };
      this.userService.addBlacklistUser(req).subscribe((res) => {
        if (res) {
          console.log(res);
          console.log(this.user);
          this.userBlacklisted.emit(this.user);
        }
      });
    }
  }
}
