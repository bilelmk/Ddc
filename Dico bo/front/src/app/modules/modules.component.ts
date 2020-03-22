import {  Component, OnInit, ViewChild} from '@angular/core';
import { Module} from '../shared/clasees/module';
import { ModulesService} from '../shared/services/modules.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AjouterModuleComponent } from './ajouter-module/ajouter-module.component';
import { SupprimerModuleComponent } from './supprimer-module/supprimer-module.component';
import { NotificationService } from '../shared/services/notification.service';
import { ModifierModuleComponent } from './modifier-module/modifier-module.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent  implements OnInit {

  @ViewChild(MatPaginator , null) paginator: MatPaginator ;

  modules : Module[] = null ;
  displayedColumns: string[] = [ 'nom' , 'image' ,'action' ];
  dataSource: MatTableDataSource<Module>;

  constructor(private moduleService : ModulesService ,  public dialog: MatDialog ,
              private notificationService : NotificationService) { }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  ngOnInit() {
    this.moduleService.getModules().subscribe(
      (response) => {
        this.modules = response ;
        this.dataSource =  new MatTableDataSource(this.modules);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.notificationService.openSnackBar('Erreur d\'acces au serveur' , 'red-snackbar')
      }
    )
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open( AjouterModuleComponent, {
      width: '800px' , height :'500px' , panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          let module : Module = res ;
          this.modules.push(module);
          this.dataSource =  new MatTableDataSource(this.modules);
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  openDeleteDialog(id : string): void {
    const dialogRef = this.dialog.open( SupprimerModuleComponent, {
      width: '800px' , data : id , panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          this.modules.splice(this.modules.findIndex(module => {
            return module._id == res
          }) , 1);
          this.dataSource =  new MatTableDataSource(this.modules);
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  openEditDialog(module : Module){
    const dialogRef = this.dialog.open( ModifierModuleComponent, {
      width: '800px' , height :'800px' ,  data : module , panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          this.modules.map(module => {
            if(module._id == res._id){
              module.module_name = res.module_name ;
              module.image = res.image
            }
          });
          this.dataSource =  new MatTableDataSource(this.modules);
          this.dataSource.paginator = this.paginator;
        }
      })
  }



}
