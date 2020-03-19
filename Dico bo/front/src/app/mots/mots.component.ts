import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MotsService } from '../shared/services/mots.service';
import { Mot } from '../shared/clasees/mot';
import {AjouterMotComponent} from './ajouter-mot/ajouter-mot.component';
import {SupprimerMotComponent} from './supprimer-mot/supprimer-mot.component';

@Component({
  selector: 'app-mots',
  templateUrl: './mots.component.html',
  styleUrls: ['./mots.component.css']
})
export class MotsComponent implements OnInit {

  @ViewChild(MatPaginator , null) paginator: MatPaginator ;
  @ViewChild(MatSort , null) sort: MatSort;

  mots : Mot[] = null ;
  displayedColumns: string[] = [ 'nom' , 'explication' ,'image' , 'action'];
  dataSource: MatTableDataSource<Mot>;

  constructor(private motsSerice : MotsService ,  public dialog : MatDialog) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit() {
    this.motsSerice.getMots().subscribe(
      (response) => {
        console.log(response);
        this.mots = response ;
        this.dataSource =  new MatTableDataSource(this.mots);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => console.log('error')
    )
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open( AjouterMotComponent, {
      width: '800px'
    });
  }

  openDeleteDialog(id : string): void {
    const dialogRef = this.dialog.open( SupprimerMotComponent, {
      width: '800px' , data : id
    });
  }

}
