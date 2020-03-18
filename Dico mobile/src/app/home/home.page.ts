import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../shared/services/module.service';
import { Module } from '../shared/classes/module';


import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  modules : Module[] = null ;

  loading : boolean = false ;

  constructor( private tts: TextToSpeech ,private router:Router  ) {}

  ngOnInit(){

  }

  start(){
    this.loading = true ;
    this.tts.speak({locale : 'fr-FR' , text :"En Commence"})
        .then(() => {
          this.loading = false ;
          this.router.navigate(['modules']);
        })
        .catch((reason: any) => console.log(reason));
  }


}
