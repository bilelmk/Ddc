import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Module } from '../shared/clasees/module';
import { ModulesService } from '../shared/services/modules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from '../shared/services/audio.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  modules : Module[] = null ;
  muted = false ;

  constructor(private tts: TextToSpeech, private moduleService : ModulesService , private router : Router ,
              private route : ActivatedRoute , private audioService : AudioService) { }

  ngOnInit() {
    this.moduleService.getModules().subscribe(
        res => {
            this.modules = res ;
        }, err => {
            console.log(err)
        }
    )
  }

  speek(mot : string , id : string){
    this.tts.speak({ locale : 'fr-FR' , text :mot})
        .then(() => {
            console.log('Success')
        })
        .catch(err => {
            console.log(err)
        });
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
}
