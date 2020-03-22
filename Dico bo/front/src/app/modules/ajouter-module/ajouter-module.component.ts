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
      'image' : new FormControl(null ,
        {validators : [Validators.required ] ,asyncValidators : [mimeType] } )})
  }

  onSaveModule(){
    if (this.form.invalid) {
      return;
    }
    const postData = new FormData();
    postData.append("module_name", this.form.value.module_name);
    postData.append("image", this.form.value.image, this.form.value.module_name);

    this.modulesService.postModule(postData).subscribe(
      res => {
        this.notificationService.openSnackBar('Module ajouté avec succés' , 'green-snackbar');
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de l\'ajout de module' , 'red-snackbar')
      }
    )
  }

  onPickImage(event : Event){
    const file = (event.target as HTMLInputElement).files[0] ;
    this.form.patchValue({image : file}) ;
    this.form.get('image').updateValueAndValidity() ;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
