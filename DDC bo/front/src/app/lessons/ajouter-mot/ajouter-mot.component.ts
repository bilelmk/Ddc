import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MotsService } from '../../shared/services/mots.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/services/notification.service';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-ajouter-mot',
  templateUrl: './ajouter-mot.component.html',
  styleUrls: ['./ajouter-mot.component.scss']
})
export class AjouterMotComponent implements OnInit {

  form : FormGroup ;
  imagePreview: string;

  constructor(private motsService : MotsService , private notificationService : NotificationService,
              public dialogRef: MatDialogRef<AjouterMotComponent> , @Inject(MAT_DIALOG_DATA) public data: string ,
              private spinnerService : SpinnerService) { }


  ngOnInit() {
    this.form = new FormGroup({
      'name' : new FormControl(null ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'explication' : new FormControl(null ,
        {validators : [ Validators.minLength(3)]} ),
      'image' : new FormControl(null  )}
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
    postData.append("lesson" , this.data);
    this.spinnerService.activate() ;
    this.motsService.postMot(postData).subscribe(
      res => {
        this.notificationService.openSnackBar('Mot ajouté avec succés' , 'green-snackbar');
        this.spinnerService.deactivate() ;
        this.dialogRef.close(res)
      },
      err => {
        this.notificationService.openSnackBar('Erreur lors de l\'ajout de mot' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
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
