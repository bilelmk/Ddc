import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/clasees/lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../shared/services/lessons.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AudioService } from '../shared/services/audio.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

  lessons : Lesson[] = null ;
  muted = false ;

  constructor(private tts: TextToSpeech , private route : ActivatedRoute , private lessonsService : LessonsService ,
              private router : Router , private audioService : AudioService , private location: Location ) { }

  ngOnInit() {
    this.route.params.subscribe(
        param => {
          this.lessonsService.getLessonsByModuleId(param.id).subscribe(
              res => {
                this.lessons = res
              },
              err => {
                console.log(err)
              }
          )
        }
    )
  }

  speek(mot : string , id : string){
        this.tts.speak({ locale : 'fr-FR' , text :mot})
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
    this.router.navigate([id] ,{ relativeTo: this.route } );
  }

  getBackground() {
      let random = Math.floor(Math.random() * 8);     // returns a random integer from 0 to 9
      return ' url(../../assets/img/btn' + random.toString() + '.png) ' ;
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

}
