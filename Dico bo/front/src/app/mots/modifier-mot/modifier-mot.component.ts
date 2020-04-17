import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MotsService } from '../../shared/services/mots.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { mimeType } from '../../shared/mime-type.validator';
import { NotificationService } from '../../shared/services/notification.service';
import { Mot } from '../../shared/clasees/mot';

@Component({
  selector: 'app-modifier-mot',
  templateUrl: './modifier-mot.component.html',
  styleUrls: ['./modifier-mot.component.css']
})
export class ModifierMotComponent implements OnInit {

  form : FormGroup ;
  imagePreview: string = this.data.image;

  constructor(private motsService : MotsService , private notificationService : NotificationService ,
              public dialogRef: MatDialogRef<ModifierMotComponent> , @Inject(MAT_DIALOG_DATA) public data: Mot ) { }


  ngOnInit() {
    this.form = new FormGroup({
      'name' : new FormControl(this.data.name ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'explication' : new FormControl(this.data.explication,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'image' : new FormControl(this.data.image ,
        {validators : [Validators.required ] ,asyncValidators : [mimeType] } )})
  }

  onSaveMot(){
    if (this.form.invalid) {
      return;
    }
    let postData : any ;
    if(typeof this.form.value.image === "object"){
      postData = new FormData() ;
      postData.append("_id", this.data._id);
      postData.append("name", this.form.value.name);
      postData.append("explication", this.form.value.explication);
      postData.append("image", this.form.value.image, this.form.value.name);
      postData.append("lesson" , this.data.lesson._id )
    }
    else{
      postData = {
        _id : this.data._id,
        name : this.form.value.name ,
        explication : this.form.value.explication,
        image : this.form.value.image,
        lesson : this.data.lesson._id
      }
    }
    this.motsService.putMot(postData , this.data._id).subscribe(
      res => {
        this.notificationService.openSnackBar('Mot modifié avec succés' , 'green-snackbar')
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de la modification de mot' , 'red-snackbar')
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
