import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelPageComponent } from './pages/panel-page/panel-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { VehiclePanelComponent } from './components/vehicle-panel/vehicle-panel.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VehicleMapComponent } from './components/vehicle-map/vehicle-map.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelPageComponent,
    LoginPageComponent,
    UserPanelComponent,
    UserListItemComponent,
    VehiclePanelComponent,
    VehicleMapComponent,
  ],
  imports: [
    LeafletModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
