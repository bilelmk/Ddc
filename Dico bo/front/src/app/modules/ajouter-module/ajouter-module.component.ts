import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../../shared/mime-type.validator';
import { ModulesService } from '../../shared/services/modules.service';
import {NotificationService} from '../../shared/services/notification.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ajouter-module',
  templateUrl: './ajouter-module.component.html',
  styleUrls: ['./ajouter-module.component.css']
})

export class AjouterModuleComponent implements OnInit {

  form : FormGroup ;
  imagePreview: string;

  constructor(private modulesService : ModulesService, private notificationService : NotificationService,
              public dialogRef: MatDialogRef<AjouterModuleComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      'module_name' : new FormControl(null ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
    })
  }

  onSaveModule(){
    if (this.form.invalid) {
      return;
    }
    this.modulesService.postModule(this.form.value).subscribe(
      res => {
        this.notificationService.openSnackBar('Module ajouté avec succés' , 'green-snackbar');
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de l\'ajout de module' , 'red-snackbar')
      }
    )
  }

}
