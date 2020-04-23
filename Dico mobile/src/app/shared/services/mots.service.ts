import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../baseurl';
import { HttpClient } from '@angular/common/http';
import { Mot } from '../clasees/mot';

@Injectable({
  providedIn: 'root'
})
export class MotsService {

  constructor(private http:HttpClient) { }

  getMotsByLessonId(id : string) : Observable<Mot[]>{
    return this.http.get<Mot[]>(baseURL + 'mots/' + id ) ;
  }

}





