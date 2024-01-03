import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-panel-page',
  templateUrl: './panel-page.component.html',
  styleUrls: ['./panel-page.component.scss'],
})
export class PanelPageComponent implements OnInit {
  public _me: any;
  isLogoutOptionsOn: boolean = false;
  navbarItems = [
    { name: 'Dashboard', route: 'dashboard' },
    { name: 'Users', route: 'users' },
    { name: 'Vehicles', route: 'vehicles' },
  ];
  panelMode: number = 1;
  // 1 -> dashboard
  // 2 -> users
  // 3 -> cars
  panelDashboardCards = [
    { name: 'Dashboard', url: '../../../assets/imgs/dashboard-icon.png' },
    { name: 'Users', url: '../../../assets/imgs/users-icon.png' },
    { name: 'Vehicles', url: '../../../assets/imgs/car-icon.png' },
  ];
  public isHovered: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .authLogin({
        email: 'admin@admin.com',
        password: 'adminadmin',
      })
      .subscribe((res) => {
        this._me = this.userService.getMe();
      });

    if (!this.userService.getAuthorized()) {
      this.router.navigate(['/login']);
    }
  }

  addReverseColorEffect() {
    this.isHovered = true;
  }

  removeReverseColorEffect() {
    this.isHovered = false;
  }
  changePanelMode(i: number) {
    this.panelMode = i + 1;
    console.log(this.panelMode);
  }
  setLogoutOptionsOn(b: boolean) {
    this.isLogoutOptionsOn = b;
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
