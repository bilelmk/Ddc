import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/services/notification.service';
import { LessonsService } from '../../shared/services/lessons.service';
import { Lesson } from '../../shared/clasees/lesson';

@Component({
  selector: 'app-supprimer-lesson',
  templateUrl: './supprimer-lesson.component.html',
  styleUrls: ['./supprimer-lesson.component.css']
})
export class SupprimerLessonComponent implements OnInit {

  constructor(private lessonsService : LessonsService , public dialogRef: MatDialogRef<SupprimerLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string , private notificationService : NotificationService) { }


  ngOnInit() {
  }

  onDelete(){
    this.lessonsService.deleteLesson(this.data).subscribe(
      res => {
        this.notificationService.openSnackBar('Lesson supprimé avec succés' , 'green-snackbar');
        this.dialogRef.close( (res as Lesson)._id )
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la suppression de lesson' , 'red-snackbar')
      }
    )
  }

}
