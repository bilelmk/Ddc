import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Module } from '../shared/clasees/module';
import { ModulesService } from '../shared/services/modules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  modules : Module[] = null ;

  constructor(private tts: TextToSpeech, private moduleService : ModulesService , private router : Router ,
                private route : ActivatedRoute) { }

  ngOnInit() {
    this.moduleService.getModules().subscribe(
        res => {
            console.log(res)
            res.map(m => {m.image = baseURL + m.image.substr(22)});
            this.modules = res ;
        }, err => {
          console.log(err)
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
