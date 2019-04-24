import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/guards/auth.guard';
import { CommonConstants } from './constants/constants';



const routes: Routes = [

  {path: '' , redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [CommonConstants.roles.ADMIN] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
