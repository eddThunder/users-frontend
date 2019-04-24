import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/guards/auth.guard';
import { CommonConstants } from './constants/constants';
import { RoleGuard } from './services/guards/role.guard';
import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './components/page2/page2.component';
import { Page3Component } from './components/page3/page3.component';
import { LayoutComponent } from './components/layout/layout.component';



const routes: Routes = [

  {path: '' , redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {
    path: 'home', component: LayoutComponent, canActivate: [AuthGuard], children:
    [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        data: { roles: [CommonConstants.roles.ADMIN] }
      },
      {
        path: 'page1', component: Page1Component,
        canActivate: [RoleGuard],
        data: { roles: [CommonConstants.roles.ADMIN, CommonConstants.roles.PAGE_1]}
      },
      {
        path: 'page2',
        component: Page2Component,
        canActivate: [RoleGuard],
        data: {roles: [CommonConstants.roles.ADMIN, CommonConstants.roles.PAGE_2]}
      },
      {
        path: 'page3',
        component: Page3Component,
        canActivate: [RoleGuard],
        data: {roles: [CommonConstants.roles.ADMIN, CommonConstants.roles.PAGE_3]}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
