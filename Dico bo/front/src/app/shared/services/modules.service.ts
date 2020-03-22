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

  postModule(module: any) {
    return this.http.post(baseURL + 'modules', module) ;
  }

  putModule(module : any , id :string){
    return this.http.put(baseURL + 'modules/' + id , module)
  }

  deleteModule( id : string) {
    return this.http.delete(baseURL + 'modules/' + id)
  }

}
