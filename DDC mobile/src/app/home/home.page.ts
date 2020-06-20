import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Router } from '@angular/router';
import { AudioService } from '../shared/services/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  muted = false ;
  loading = false ;

  constructor( private tts: TextToSpeech , private router : Router ,  private audioService : AudioService) {}

  ngOnInit(){
  }

  start(){
    this.loading = true ;
    // this.tts.speak({ locale : 'fr-FR' , text : "En Commence" })
    //     .then(() => {
    //         this.loading = false ;
            this.router.navigate(['modules']);
        // })
        // .catch((reason: any) => console.log(reason));
  }


  mute() {
      this.muted = !this.muted ;
      this.audioService.stopAudio()

  }

  unmute() {
      this.muted = !this.muted ;
      this.audioService.playAudio()
  }
}
