import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModulesService } from '../../shared/services/modules.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Module } from '../../shared/clasees/module';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-supprimer-module',
  templateUrl: './supprimer-module.component.html',
  styleUrls: ['./supprimer-module.component.scss']
})
export class SupprimerModuleComponent implements OnInit {

  constructor(private modulesService : ModulesService , public dialogRef: MatDialogRef<SupprimerModuleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string , private notificationService : NotificationService ,
              private spinnerService : SpinnerService) { }


  ngOnInit() {
  }

  onDelete(){
    this.spinnerService.activate() ;
    this.modulesService.deleteModule(this.data).subscribe(
      res => {
        this.notificationService.openSnackBar('Module supprimé avec succés' , 'green-snackbar');
        this.spinnerService.deactivate() ;
        this.dialogRef.close( (res as Module)._id )
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la suppression de module' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    )
  }

}
