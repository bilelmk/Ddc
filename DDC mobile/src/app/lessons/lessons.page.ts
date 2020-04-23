import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/clasees/lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../shared/services/lessons.service';
import { baseURL } from '../shared/baseurl';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

  lessons : Lesson[] = null ;

  constructor(private tts: TextToSpeech , private route : ActivatedRoute , private lessonsService : LessonsService ,
              private router : Router) { }

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

}
