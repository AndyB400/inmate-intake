import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditComponent } from './components';
import { InmateResolver } from './inmate.resolver';

export const routes = [
  { path: '', component: EditComponent },
  { path: 'new', component: EditComponent },
  { path: ':id', component: EditComponent, resolve: { inmate: InmateResolver } },
  { path: '*', component: EditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmateRoutingModule {}
