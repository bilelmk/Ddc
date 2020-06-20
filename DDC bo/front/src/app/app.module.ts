import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AjouterMotComponent } from './lessons/ajouter-mot/ajouter-mot.component';
import { SupprimerMotComponent } from './mots/supprimer-mot/supprimer-mot.component';
import { ModifierMotComponent } from './mots/modifier-mot/modifier-mot.component';
import { ModifierLessonComponent } from './lessons/modifier-lesson/modifier-lesson.component';
import { AjouterLessonComponent } from './modules/ajouter-lesson/ajouter-lesson.component';
import { SupprimerLessonComponent } from './lessons/supprimer-lesson/supprimer-lesson.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatIconModule,
  MatSlideToggleModule,
  MatTableModule,
  MatSortModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSliderModule,
  MatGridListModule,
  MatListModule,
} from '@angular/material';

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
    SidebarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSliderModule,
    MatGridListModule,
    MatListModule,
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
