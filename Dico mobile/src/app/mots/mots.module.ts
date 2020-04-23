import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotsPageRoutingModule } from './mots-routing.module';

import { MotsPage } from './mots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotsPageRoutingModule
  ],
  declarations: [MotsPage]
})
export class MotsPageModule {}
