import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, , SharedModule, HomeRoutingModule
  ]
})
export class HomeModule { }
