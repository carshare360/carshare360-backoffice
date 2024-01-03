import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/Vehicle';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-vehicle-panel',
  templateUrl: './vehicle-panel.component.html',
  styleUrls: ['./vehicle-panel.component.scss'],
})
export class VehiclePanelComponent implements OnInit {
  allVehicles: Vehicle[] = [];
  paginatedVehicles: Vehicle[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  expansionTable!: boolean[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getVehicles().subscribe((res) => {
      this.allVehicles = res;
      this.paginate();
    });
    this.expansionTable = Array(this.itemsPerPage).fill(false);
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedVehicles = this.allVehicles.slice(startIndex, endIndex);
  }
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.paginate();
  }
  getPages(): number[] {
    const pageCount = Math.ceil(this.allVehicles.length / this.itemsPerPage);
    return Array(pageCount)
      .fill(0)
      .map((_, index) => index + 1);
  }
  toggleExpansion(index: number) {
    this.expansionTable[index] = !this.expansionTable[index];
  }
  getExpansionInfo(i: number) {
    return this.expansionTable[i];
  }
}
