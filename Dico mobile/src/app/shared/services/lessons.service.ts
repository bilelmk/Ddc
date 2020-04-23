import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../baseurl';
import { Lesson } from '../clasees/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http:HttpClient) { }

  getLessonsByModuleId( id : string) : Observable<Lesson[]>{
    return this.http.get<Lesson[]>(baseURL + 'lessons/' + id) ;
  }

}
