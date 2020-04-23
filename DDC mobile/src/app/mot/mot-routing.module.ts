import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotPage } from './mot.page';

const routes: Routes = [
  {
    path: '',
    component: MotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotPageRoutingModule {}
