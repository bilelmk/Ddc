import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module } from '../classes/module';
import { Observable } from 'rxjs';
import { baseURL } from '../baseurl';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http:HttpClient) { }

  getModules() : Observable<Module[]>{
    return this.http.get<Module[]>(baseURL + 'modules') ;
  }
}
