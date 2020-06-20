import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  audio  ;

  constructor() {
    console.log('sqdqsd')
    this.audio = new Audio() ;
    this.audio.autoplay = true ;
    this.audio.src = "./../../../assets/sound/ukulele.mp3";
    // this.audio.play() ;
  }

  playAudio(){
    this.audio.play();
  }

  stopAudio(){
    this.audio.pause()
  }


}
