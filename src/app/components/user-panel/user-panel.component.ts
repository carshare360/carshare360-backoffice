import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  users: User[] = [];
  blackListedUsers: User[] = [];
  showBlacklisted: boolean = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      this.blackListedUsers = this.users.filter((user) => user.blacklisted);
      this.users = this.users.filter((user) => !user.blacklisted);
    });
  }
  toggleBlackListed() {
    this.showBlacklisted = !this.showBlacklisted;
  }
  onUserBlacklisted(user: User) {
    console.log('emmitedd', user);
    this.users = this.users.filter((u) => u !== user);
    this.blackListedUsers.push(user);
  }
}
