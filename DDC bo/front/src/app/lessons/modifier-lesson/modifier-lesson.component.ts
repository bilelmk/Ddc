import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Lesson } from '../../shared/clasees/lesson';
import { LessonsService } from '../../shared/services/lessons.service';

@Component({
  selector: 'app-modifier-lesson',
  templateUrl: './modifier-lesson.component.html',
  styleUrls: ['./modifier-lesson.component.css']
})
export class ModifierLessonComponent implements OnInit {

  form: FormGroup;

  constructor(private lessonsService: LessonsService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ModifierLessonComponent>, @Inject(MAT_DIALOG_DATA) public data: Lesson) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'lesson_name' : new FormControl(this.data.lesson_name ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
     })
  }

  onSaveLesson() {
    if (this.form.invalid) {
      return;
    }
    this.lessonsService.putLesson(this.form.value, this.data._id).subscribe(
      res => {
        this.notificationService.openSnackBar('Lesson modifié avec succés', 'green-snackbar')
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la modification de lesson', 'red-snackbar')
      }
    )
  }

}
