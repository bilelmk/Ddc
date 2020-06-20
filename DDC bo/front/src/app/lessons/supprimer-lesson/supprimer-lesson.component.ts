import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/services/notification.service';
import { LessonsService } from '../../shared/services/lessons.service';
import { Lesson } from '../../shared/clasees/lesson';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-supprimer-lesson',
  templateUrl: './supprimer-lesson.component.html',
  styleUrls: ['./supprimer-lesson.component.scss']
})
export class SupprimerLessonComponent implements OnInit {

  constructor(private lessonsService : LessonsService , public dialogRef: MatDialogRef<SupprimerLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string , private notificationService : NotificationService ,
              private spinnerService : SpinnerService) { }


  ngOnInit() {
  }

  onDelete(){
    this.spinnerService.activate() ;
    this.lessonsService.deleteLesson(this.data).subscribe(
      res => {
        this.notificationService.openSnackBar('Lesson supprimé avec succés' , 'green-snackbar');
        this.spinnerService.deactivate() ;
        this.dialogRef.close( (res as Lesson)._id )
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la suppression de lesson' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    )
  }

}
