import {  Component, OnInit, ViewChild} from '@angular/core';
import { Module} from '../shared/clasees/module';
import { ModulesService} from '../shared/services/modules.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AjouterModuleComponent} from './ajouter-module/ajouter-module.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent  implements OnInit {

  @ViewChild(MatPaginator , null) paginator: MatPaginator ;
  @ViewChild(MatSort , null) sort: MatSort;


  modules : Module[] = null ;
  displayedColumns: string[] = ['_id', 'nom' ,'action' , 'image'];
  dataSource: MatTableDataSource<Module>;

  constructor(private moduleService : ModulesService ,  public dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit() {
    this.moduleService.getModules().subscribe(
      (response) => {
        console.log(response);
        this.modules = response ;
        this.dataSource =  new MatTableDataSource(this.modules);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => console.log('error')
    )
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open( AjouterModuleComponent, {
      width: '800px'
    });
  }

}
