import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MotsService } from '../../shared/services/mots.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Mot } from '../../shared/clasees/mot';

@Component({
  selector: 'app-supprimer-mot',
  templateUrl: './supprimer-mot.component.html',
  styleUrls: ['./supprimer-mot.component.css']
})
export class SupprimerMotComponent implements OnInit {

  constructor(private motsService : MotsService , public dialogRef: MatDialogRef<SupprimerMotComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string ,
              private notificationService : NotificationService) { }

  ngOnInit() {
  }

  onDelete(){
    this.motsService.deleteMot(this.data).subscribe(
      res => {
        this.notificationService.openSnackBar('Mot supprimé avec succés' , 'green-snackbar');
        this.dialogRef.close( (res as Mot)._id )
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la suppression de mot' , 'red-snackbar')
      }
    )
  }

}
