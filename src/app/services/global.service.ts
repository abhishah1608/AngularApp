import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseurlservice: string;

  translatorfilepath: string;

  language: string;

  constructor() {
    // this.baseurlservice = "http://localhost:54701/api/";
    // api for url service.
    // url for Web Api developed in Asp.net Web Api.
    this.baseurlservice = 'https://demoangularapp.gear.host/api/';

    this.language = 'tr';

    this.translatorfilepath = '../../' + this.language + '/assets/translatorfiles/';
  }
}
