import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { mimeType } from '../../shared/mime-type.validator';
import { ModulesService } from '../../shared/services/modules.service';
import { Module } from '../../shared/clasees/module';

@Component({
  selector: 'app-modifier-module',
  templateUrl: './modifier-module.component.html',
  styleUrls: ['./modifier-module.component.css']
})
export class ModifierModuleComponent implements OnInit {

  form : FormGroup ;

  constructor(private modulesService : ModulesService , private notificationService : NotificationService ,
              public dialogRef: MatDialogRef<ModifierModuleComponent> , @Inject(MAT_DIALOG_DATA) public data: Module ) { }


  ngOnInit() {
    this.form = new FormGroup({
      'module_name' : new FormControl(this.data.module_name ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
    })
  }

  onSaveModule(){
    if (this.form.invalid) {
      return;
    }
    this.modulesService.putModule(this.form.value , this.data._id).subscribe(
      res => {
        this.notificationService.openSnackBar('Module modifié avec succés' , 'green-snackbar')
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la modification de module' , 'red-snackbar')
      }
    )
  }


}
