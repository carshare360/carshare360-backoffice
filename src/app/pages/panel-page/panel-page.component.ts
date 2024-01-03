import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-page',
  templateUrl: './panel-page.component.html',
  styleUrls: ['./panel-page.component.scss'],
})
export class PanelPageComponent {
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
}
