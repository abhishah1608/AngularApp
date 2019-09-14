import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BookapiService {

  url: string = this.global.baseurlservice + 'Book/';

  constructor(private httpclient: HttpClient, private global: GlobalService) { }

  GetBookList(): Observable<Book[]> {
    const books: Book[] = null;
    const urlpath = this.url + 'GetBooks';
    const httpOptions = {
      headers: new HttpHeaders({
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
       Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    return this.httpclient.get<Book[]>(urlpath, httpOptions);
  }

}
