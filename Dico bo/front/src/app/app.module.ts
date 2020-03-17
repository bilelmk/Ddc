import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule } from "@angular/material";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModulesComponent } from './modules/modules.component';
import { LessonsComponent } from './lessons/lessons.component';
import { MotsComponent } from './mots/mots.component';

import { AjouterModuleComponent } from './modules/ajouter-module/ajouter-module.component';
import { SupprimerModuleComponent } from './modules/supprimer-module/supprimer-module.component';
import { ModifierModuleComponent } from './modules/modifier-module/modifier-module.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModulesComponent,
    LessonsComponent,
    MotsComponent,
    AjouterModuleComponent,
    SupprimerModuleComponent,
    ModifierModuleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    BrowserAnimationsModule

  ],
  providers: [],
  entryComponents : [
    AjouterModuleComponent,
    SupprimerModuleComponent,
    ModifierModuleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
