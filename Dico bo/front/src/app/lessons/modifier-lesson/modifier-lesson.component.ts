import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { mimeType } from '../../shared/mime-type.validator';
import { Lesson } from '../../shared/clasees/lesson';
import {LessonsService} from '../../shared/services/lessons.service';

@Component({
  selector: 'app-modifier-lesson',
  templateUrl: './modifier-lesson.component.html',
  styleUrls: ['./modifier-lesson.component.css']
})
export class ModifierLessonComponent implements OnInit {

  form: FormGroup;
  imagePreview: string = this.data.image;

  constructor(private lessonsService: LessonsService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ModifierLessonComponent>, @Inject(MAT_DIALOG_DATA) public data: Lesson) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'lesson_name' : new FormControl(this.data.lesson_name ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'image' : new FormControl(this.data.image ,
        {validators : [Validators.required ] ,asyncValidators : [mimeType] } )})
  }

  onSaveLesson() {
    if (this.form.invalid) {
      return;
    }
    let postData: any;
    if (typeof this.form.value.image === "object") {
      postData = new FormData();
      postData.append("_id", this.data._id);
      postData.append("lesson_name", this.form.value.lesson_name);
      postData.append("image", this.form.value.image, this.form.value.name);
      postData.append("module", this.data.module._id)
    } else {
      postData = {
        _id: this.data._id,
        lesson_name: this.form.value.lesson_name,
        image: this.form.value.image,
        module: this.data.module._id
      }
    }
    this.lessonsService.putLesson(postData, this.data._id).subscribe(
      res => {
        this.notificationService.openSnackBar('Lesson modifié avec succés', 'green-snackbar')
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la modification de lesson', 'red-snackbar')
      }
    )
  }

  onPickImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
