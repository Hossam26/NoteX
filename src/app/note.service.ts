import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
base:string='https://routeegypt.herokuapp.com/'
  constructor(private _http:HttpClient) { }
  getUserNotes(data:any):Observable<any>{
    return this._http.post(this.base+'getUserNotes',data)
  }
  updateNote(data:any):Observable<any>{
    return this._http.put(this.base+'updateNote',data)
  }
  addeNote(data:any):Observable<any>{
    return this._http.post(this.base+'addNote',data)
  }
  deleteNote(data:any):Observable<any>{
    let options={
      headers:new  HttpHeaders({}),
       body:data
    }
    return this._http.delete(this.base+'deleteNote',options)
  }
}
