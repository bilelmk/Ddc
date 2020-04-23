import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/services/notification.service';
import { LessonsService } from '../../shared/services/lessons.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../shared/mime-type.validator';

@Component({
  selector: 'app-ajouter-lesson',
  templateUrl: './ajouter-lesson.component.html',
  styleUrls: ['./ajouter-lesson.component.css']
})
export class AjouterLessonComponent implements OnInit {

  form : FormGroup ;
  imagePreview: string;

  constructor(private lessonsService : LessonsService, public dialogRef: MatDialogRef<AjouterLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string , private notificationService : NotificationService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'lesson_name' : new FormControl(null ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
     })
  }


  onSaveLesson(){
    if (this.form.invalid) {
      return;
    }
    const lesson = {
      lesson_name : this.form.value.lesson_name ,
      module : this.data
    };
    this.lessonsService.postLesson(lesson).subscribe(
      res => {
        this.notificationService.openSnackBar('Lesson ajouté avec succés' , 'green-snackbar');
        this.dialogRef.close()
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de l\'ajout de lesson' , 'red-snackbar')
      }
    )
  }

}
