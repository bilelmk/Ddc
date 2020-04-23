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

    getBackground() {
        let random = Math.floor(Math.random() * 8);     // returns a random integer from 0 to 9
        return 'url(../../assets/img/btn'+random.toString()+'.png)'
    }
}
