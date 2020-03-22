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
  imagePreview: string = this.data.image;

  constructor(private modulesService : ModulesService , private notificationService : NotificationService ,
              public dialogRef: MatDialogRef<ModifierModuleComponent> , @Inject(MAT_DIALOG_DATA) public data: Module ) { }


  ngOnInit() {
    this.form = new FormGroup({
      'module_name' : new FormControl(this.data.module_name ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'image' : new FormControl(this.data.image ,
        {validators : [Validators.required ] ,asyncValidators : [mimeType] } )})
  }

  onSaveModule(){
    if (this.form.invalid) {
      return;
    }
    let postData : any ;
    if(typeof this.form.value.image === "object"){
      postData = new FormData() ;
      postData.append("_id", this.data._id);
      postData.append("module_name", this.form.value.module_name);
      postData.append("image", this.form.value.image, this.form.value.module_name);
    }
    else{
      postData = {
        _id : this.data._id,
        module_name : this.form.value.module_name ,
        image : this.form.value.image
      }
    }
    this.modulesService.putModule(postData , this.data._id).subscribe(
      res => {
        this.notificationService.openSnackBar('Module modifié avec succés' , 'green-snackbar')
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la modification de module' , 'red-snackbar')
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
