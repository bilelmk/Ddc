import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../../shared/mime-type.validator';
import { MotsService } from '../../shared/services/mots.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-ajouter-mot',
  templateUrl: './ajouter-mot.component.html',
  styleUrls: ['./ajouter-mot.component.css']
})
export class AjouterMotComponent implements OnInit {

  form : FormGroup ;
  imagePreview: string;

  constructor(private motsService : MotsService , private notificationService : NotificationService,
              public dialogRef: MatDialogRef<AjouterMotComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name' : new FormControl(null ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'explication' : new FormControl(null ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'image' : new FormControl(null ,
        {validators : [Validators.required ] ,asyncValidators : [mimeType] } )}
        )
  }

  onSaveMot(){
    if (this.form.invalid) {
      return;
    }
    const postData = new FormData();
    postData.append("name", this.form.value.name);
    postData.append("explication", this.form.value.explication);
    postData.append("image", this.form.value.image, this.form.value.name);
    this.motsService.postMot(postData).subscribe(
      res => {
        this.notificationService.openSnackBar('Mot ajouté avec succés' , 'green-snackbar');
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de l\'ajout de mot' , 'red-snackbar')
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
