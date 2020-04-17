import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MotsService } from '../shared/services/mots.service';
import { Mot } from '../shared/clasees/mot';
import { SupprimerMotComponent } from './supprimer-mot/supprimer-mot.component';
import { ModifierMotComponent } from './modifier-mot/modifier-mot.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mots',
  templateUrl: './mots.component.html',
  styleUrls: ['./mots.component.css']
})
export class MotsComponent implements OnInit {

  @ViewChild(MatPaginator , null) paginator: MatPaginator ;

  mots : Mot[] = null ;
  displayedColumns: string[] = [ 'nom' , 'explication' ,'image' , 'action'];
  dataSource: MatTableDataSource<Mot>;

  constructor(private motsSerice : MotsService ,  public dialog : MatDialog , private route : ActivatedRoute) { }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


  ngOnInit() {
    this.route.params.subscribe(
      res => {
          this.motsSerice.getMotsByLessonId(res.id).subscribe(
            (response) => {
              console.log(response)
              this.mots = response ;
              this.dataSource =  new MatTableDataSource(this.mots);
              this.dataSource.paginator = this.paginator;
            },
            (error) => console.log('error')
          )
      })
  }


  openDeleteDialog(id : string): void {
    const dialogRef = this.dialog.open( SupprimerMotComponent, {
      width: '800px' , data : id , panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          this.mots.splice(this.mots.findIndex(mot => {
            return mot._id == res
          }) , 1);
          this.dataSource =  new MatTableDataSource(this.mots);
          this.dataSource.paginator = this.paginator;
        }
      })
  }


  openEditDialog(mot : Mot){
    const dialogRef = this.dialog.open( ModifierMotComponent, {
      width: '800px' , height :'800px' ,  data : mot , panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          this.mots.map(mot => {
            if(mot._id == res._id){
              mot.name = res.name ;
              mot.explication = res.explication;
              mot.image = res.image
            }
          });
          this.dataSource =  new MatTableDataSource(this.mots);
          this.dataSource.paginator = this.paginator;
        }
      })
  }


}
