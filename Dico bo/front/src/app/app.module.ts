import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatTableModule,
  MatSortModule,
  MatSidenavModule,
  MatSnackBarModule, MatDialogModule, MatAutocompleteModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModulesComponent } from './modules/modules.component';
import { LessonsComponent } from './lessons/lessons.component';
import { MotsComponent } from './mots/mots.component';
import { AjouterModuleComponent } from './modules/ajouter-module/ajouter-module.component';
import { SupprimerModuleComponent } from './modules/supprimer-module/supprimer-module.component';
import { ModifierModuleComponent } from './modules/modifier-module/modifier-module.component';
import { AjouterMotComponent } from './mots/ajouter-mot/ajouter-mot.component';
import { SupprimerMotComponent } from './mots/supprimer-mot/supprimer-mot.component';
import { ModifierMotComponent } from './mots/modifier-mot/modifier-mot.component';
import { ModifierLessonComponent } from './lessons/modifier-lesson/modifier-lesson.component';
import { AjouterLessonComponent } from './modules/ajouter-lesson/ajouter-lesson.component';
import { SupprimerLessonComponent } from './lessons/supprimer-lesson/supprimer-lesson.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
    ModifierModuleComponent,
    AjouterMotComponent,
    SupprimerMotComponent,
    ModifierMotComponent,
    ModifierLessonComponent,
    AjouterLessonComponent,
    SupprimerLessonComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule

  ],
  providers: [],
  entryComponents : [
    AjouterModuleComponent,
    SupprimerModuleComponent,
    ModifierModuleComponent,
    AjouterMotComponent,
    SupprimerMotComponent,
    ModifierMotComponent,
    ModifierLessonComponent,
    AjouterLessonComponent,
    SupprimerLessonComponent,

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
