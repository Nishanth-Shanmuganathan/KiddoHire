import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material.module';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
