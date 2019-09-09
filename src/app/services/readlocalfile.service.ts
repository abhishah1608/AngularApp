import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadlocalfileService {

  filecontent: any;


  constructor(private http: HttpClient) { }

  ReadFile(filepath: string): Observable<any> {
        return this.http.get(filepath);
  }

}
