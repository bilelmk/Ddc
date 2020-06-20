import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MotsService } from '../shared/services/mots.service';
import { Mot } from '../shared/clasees/mot';
import { baseURL } from '../shared/baseurl';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Location } from '@angular/common' ;
import { AudioService } from '../shared/services/audio.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-mots',
  templateUrl: './mots.page.html',
  styleUrls: ['./mots.page.scss'],
})
export class MotsPage implements OnInit {

  mots : Mot[] = null ;
  initMots : Mot[] = null ;
  muted = false ;

  constructor( private tts: TextToSpeech , private route : ActivatedRoute , private motsService : MotsService ,
               private audioService : AudioService , private location : Location ,) { }

    // private nativePageTransitions: NativePageTransitions

  ngOnInit() {
    this.route.params.subscribe(
        param => {
          this.motsService.getMotsByLessonId(param.id).subscribe(
              res => {
                res.map(m => {m.image = baseURL + m.image.substr(22)});
                this.mots = res ;
                this.initMots = res ;
                console.log(this.mots)
              },
              err => {
                console.log(err)
              }
          )
        }
    )
  }
    // ionViewWillLeave() {
    //     let options: NativeTransitionOptions = {
    //         direction: 'up',
    //         duration: 500,
    //         slowdownfactor: 3,
    //         slidePixels: 20,
    //         iosdelay: 100,
    //         androiddelay: 150,
    //         fixedPixelsTop: 0,
    //         fixedPixelsBottom: 60
    //     };
    //
    //     this.nativePageTransitions.slide(options)
    //         .then()
    //         .catch();
    //
    // }

  speek(mot : string){
        this.tts.speak({ locale : 'fr-FR' , text :mot})
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
  }

  mute() {
      this.muted = !this.muted ;
      this.audioService.stopAudio()
  }

  unmute() {
      this.muted = !this.muted ;
      this.audioService.playAudio()
  }

  back() {
      this.location.back();
  }

  recherche(event) {
      let filter = event.target.value ;
      this.mots = this.initMots ;
      this.mots = this.mots.filter( (mot) => {
          return mot.name.toLowerCase().includes(filter.toLowerCase());
      });
      console.log(this.mots)

  }
}
