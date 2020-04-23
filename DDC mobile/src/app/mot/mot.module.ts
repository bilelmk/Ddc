import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotPageRoutingModule } from './mot-routing.module';

import { MotPage } from './mot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotPageRoutingModule
  ],
  declarations: [MotPage]
})
export class MotPageModule {}
