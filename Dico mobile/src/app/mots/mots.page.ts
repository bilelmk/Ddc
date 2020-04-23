import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MotsService } from '../shared/services/mots.service';
import { Mot } from '../shared/clasees/mot';
import {baseURL} from '../shared/baseurl';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-mots',
  templateUrl: './mots.page.html',
  styleUrls: ['./mots.page.scss'],
})
export class MotsPage implements OnInit {

  mots : Mot[] = null ;

  constructor( private tts: TextToSpeech , private route : ActivatedRoute , private motsService : MotsService) { }

  ngOnInit() {
    this.route.params.subscribe(
        param => {
          this.motsService.getMotsByLessonId(param.id).subscribe(
              res => {
                res.map(m => {m.image = baseURL + m.image.substr(22)});
                this.mots = res ;
              },
              err => {
                console.log(err)
              }
          )
        }
    )
  }

  speek(mot : string){
        this.tts.speak({ locale : 'fr-FR' , text :mot})
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
  }
}
