import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from '../../shared/services/modules.service';
import { mimeType } from '../../shared/mime-type.validator';

@Component({
  selector: 'app-ajouter-mot',
  templateUrl: './ajouter-mot.component.html',
  styleUrls: ['./ajouter-mot.component.css']
})
export class AjouterMotComponent implements OnInit {


  form : FormGroup ;
  imagePreview: string;


  constructor(private moduleService : ModulesService) { }

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

    this.moduleService.postModule(postData).subscribe(
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