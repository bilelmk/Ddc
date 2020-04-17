import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModulesComponent } from './modules/modules.component';
import { LessonsComponent } from './lessons/lessons.component';
import { MotsComponent } from './mots/mots.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent ,
    children : [
      {
        path: '',
        redirectTo: 'modules',
        pathMatch: 'full',
      },
      {
        path: 'modules',
        component: ModulesComponent
      },
      {
        path: 'modules/:id',
        component: LessonsComponent
      },
      {
        path: 'modules/:id/:id',
        component: MotsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
