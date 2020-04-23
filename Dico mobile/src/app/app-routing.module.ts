import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: 'modules', loadChildren: () => import('./modules/modules.module').then( m => m.ModulesPageModule) },
  { path: 'modules/:id', loadChildren: () => import('./lessons/lessons.module').then( m => m.LessonsPageModule) },
  { path: 'modules/:id/:id', loadChildren: () => import('./mots/mots.module').then( m => m.MotsPageModule) },
  { path: 'mot', loadChildren: () => import('./mot/mot.module').then( m => m.MotPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
