import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../clasees/module';
import { baseURL } from '../baseurl'

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(private http:HttpClient) { }

  getModules() : Observable<Module[]>{
    return this.http.get<Module[]>(baseURL + 'modules') ;
  }

}
