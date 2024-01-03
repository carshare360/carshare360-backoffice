import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-panel-page',
  templateUrl: './panel-page.component.html',
  styleUrls: ['./panel-page.component.scss'],
})
export class PanelPageComponent implements OnInit {
  isLogoutOptionsOn: boolean = false;

  navbarItems = [
    { name: 'Dashboard', route: 'dashboard' },
    { name: 'Users', route: 'users' },
    { name: 'Disputes', route: 'disputes' },
  ];
  panelMode: number = 1;
  // 1 -> dashboard
  // 2 -> users
  // 3 -> disputes
  panelDashboardCards = [
    { name: 'Dashboard', url: '../../../assets/imgs/dashboard-icon.png' },
    { name: 'Users', url: '../../../assets/imgs/users-icon.png' },
    { name: 'Dispute', url: '../../../assets/imgs/dispute-icon.png' },
  ];
  public isHovered: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
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
