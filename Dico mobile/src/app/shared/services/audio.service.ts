import { Injectable } from '@angular/core';
import { Howl } from 'Howler' ;
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  player : Howl = null ;

  constructor(private loadingController : LoadingController ) { }

  playAudio(){
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.player = new Howl({ src : '../../../assets/sound/ukulele.mp3' ,
            loop: true,
            onplay : () => {
              loading.dismiss() ;
            }}
          );
          this.player.play() ;

        }).catch(err => {
          console.log(err)
    })
  }

  stopAudio(){
    this.player.stop()
  }

  muteAudio(){
      this.player.mute(true)
  }

   unmuteAudio(){
        this.player.mute(false)
  }
}
