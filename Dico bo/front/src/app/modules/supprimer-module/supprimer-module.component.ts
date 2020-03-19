import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModulesService } from '../../shared/services/modules.service';

@Component({
  selector: 'app-supprimer-module',
  templateUrl: './supprimer-module.component.html',
  styleUrls: ['./supprimer-module.component.css']
})
export class SupprimerModuleComponent implements OnInit {

  constructor(private modulesService : ModulesService , public dialogRef: MatDialogRef<SupprimerModuleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string ) { }

  ngOnInit() {
  }

  onDelete(){
    this.modulesService.deleteModule(this.data).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )


  }

}
