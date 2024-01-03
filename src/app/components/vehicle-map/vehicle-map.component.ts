import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/Vehicle';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.scss'],
})
export class VehicleMapComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  options!: Leaflet.MapOptions;
  ngOnInit(): void {
    this.options = {
      layers: getLayers(this.vehicle),
      zoom: 12,
      center: new Leaflet.LatLng(
        this.vehicle.location.coordinates[1],
        this.vehicle.location.coordinates[0]
      ),
    };
  }
}
export const getLayers = (vehicle: Vehicle): Leaflet.Layer[] => {
  const customIcon = new Leaflet.Icon({
    iconUrl: '../../../assets/imgs/marker-icon.png', // Replace with your PNG path
    iconSize: [32, 32], // Adjust icon size as needed
  });
  const vehicleMarker = new Leaflet.Marker(
    [vehicle.location.coordinates[1], vehicle.location.coordinates[0]],
    { icon: customIcon }
  );

  return [
    new Leaflet.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
      } as Leaflet.TileLayerOptions
    ),
    vehicleMarker,
  ] as Leaflet.Layer[];
};
