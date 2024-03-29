import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonsService } from '../shared/services/lessons.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Lesson } from '../shared/clasees/lesson';
import { NotificationService } from '../shared/services/notification.service';
import { SupprimerLessonComponent } from './supprimer-lesson/supprimer-lesson.component';
import { ModifierLessonComponent } from './modifier-lesson/modifier-lesson.component';
import { AjouterMotComponent } from './ajouter-mot/ajouter-mot.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  @ViewChild(MatPaginator , null) paginator: MatPaginator ;
  lessons : Lesson[] = null ;
  displayedColumns: string[] = [ 'nom' , 'action' ];
  dataSource: MatTableDataSource<Lesson>;

  constructor(private route : ActivatedRoute , private lessonsService : LessonsService  ,
              private notificationService : NotificationService , public dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.route.params.subscribe(
      res => {
        this.lessonsService.getLessonsByModuleId(res.id).subscribe(
          response =>{
            this.lessons = response ;
            this.dataSource =  new MatTableDataSource(this.lessons);
            this.dataSource.paginator = this.paginator;
        },
          error => {
            this.notificationService.openSnackBar('Erreur d\'acces au serveur' , 'red-snackbar')
          })
      }
  )}


  openAddMotDialog(id: string) {
    const dialogRef = this.dialog.open( AjouterMotComponent , {
      width: '800px' , data : id , panelClass: 'custom-dialog-container'
    });
  }

  openEditDialog(lesson: Lesson) {
    const dialogRef = this.dialog.open( ModifierLessonComponent , {
      width: '800px' , data : lesson , panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          this.lessons.map(lesson => {
            if(lesson._id == res._id){
              lesson.lesson_name = res.lesson_name ;
            }
          });
          this.dataSource =  new MatTableDataSource(this.lessons);
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open( SupprimerLessonComponent, {
      width: '800px' , data : id , panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          this.lessons.splice(this.lessons.findIndex(lesson => {
            return lesson._id == res
          }) , 1);
          this.dataSource =  new MatTableDataSource(this.lessons);
          this.dataSource.paginator = this.paginator;
        }
      })
  }
}
