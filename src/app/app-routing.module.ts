import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelPageComponent } from './pages/panel-page/panel-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: 'panel', component: PanelPageComponent },
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
