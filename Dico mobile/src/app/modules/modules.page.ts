import { Component, OnInit } from '@angular/core';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';
import {ModuleService} from '../shared/services/module.service';
import {Module} from '../shared/classes/module';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  modules : Module[] = null ;

  constructor(private tts: TextToSpeech, private moduleService : ModuleService) { }

  ngOnInit() {
    this.moduleService.getModules().subscribe(
        res => {
          res.map(m => {m.image = "http://f0bde555.ngrok.io" + m.image.substr(21)}
            );
          this.modules = res ;
          console.log(this.modules);
          console.log(res);
        }, err => {
          console.log(err)
        }
    )
  }

  speek(mot : string){
    this.tts.speak({ locale : 'fr-FR' , text :mot})
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
  }
}
