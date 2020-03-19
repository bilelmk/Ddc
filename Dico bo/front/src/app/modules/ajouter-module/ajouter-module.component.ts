import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../../shared/mime-type.validator';
import { MotsService } from '../../shared/services/mots.service';

@Component({
  selector: 'app-ajouter-module',
  templateUrl: './ajouter-module.component.html',
  styleUrls: ['./ajouter-module.component.css']
})

export class AjouterModuleComponent implements OnInit {

  form : FormGroup ;
  imagePreview: string;

  constructor(private motsService : MotsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name' : new FormControl(null ,
                        {validators : [Validators.required , Validators.minLength(3)]} ),
      'explication' : new FormControl(null ,
        {validators : [Validators.required , Validators.minLength(3)]} ),
      'image' : new FormControl(null ,
        {validators : [Validators.required ] ,asyncValidators : [mimeType] } )})
  }

  onSaveModule(){
    if (this.form.invalid) {
      return;
    }
    const postData = new FormData();
    postData.append("name", this.form.value.name);
    postData.append("explication", this.form.value.explication);
    postData.append("image", this.form.value.image, this.form.value.name);

    this.motsService.postMot(postData).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
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
