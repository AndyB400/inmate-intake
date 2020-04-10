import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, UnauthorisedComponent } from 'core/components';
import { AuthGuard } from 'core/guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorised', component: UnauthorisedComponent, canActivate: [AuthGuard] },
  {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      canLoad: [AuthGuard]
  },
  {
      path: 'inmate',
      loadChildren: () => import('./inmate/inmate.module').then(m => m.InmateModule),
      canLoad: [AuthGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
