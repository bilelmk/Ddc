import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotsPage } from './mots.page';

const routes: Routes = [
  {
    path: '',
    component: MotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotsPageRoutingModule {}
