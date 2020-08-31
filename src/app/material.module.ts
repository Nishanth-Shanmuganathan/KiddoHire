import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const Materials = [
  MatCardModule,
  MatButtonModule
];

@NgModule({
  imports: [BrowserAnimationsModule, ...Materials],
  exports: [...Materials]
})

export class MaterialModule { }
