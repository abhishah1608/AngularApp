import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GlobalService } from 'src/app/services/global.service';
import { UserAddClass } from 'src/app/model/user-add-class';
import { HistoryInfo } from 'src/app/model/history-info';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  url: string = this.global.baseurlservice + 'History/';

  historyinfo: HistoryInfo = null;

  historyserviceobj: any;

  constructor(private httpclient: HttpClient, private global: GlobalService) { }


  ngOnInit() {

    const apiurl  = this.url + 'GetPurchaseHistory';

    const user: UserAddClass = new UserAddClass();

    user.LoginId = 0;
    user.emailId = '';
    user.UserId = Number(sessionStorage.getItem('UserId'));

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    })
    };

    this.historyserviceobj = this.httpclient.post(apiurl, user, httpOptions).subscribe((data) => {
        this.historyinfo = data as HistoryInfo;
    });

  }

  // unsubsribe observables.
  ngOnDestroy(): void {
      if (this.historyserviceobj) {
        this.historyserviceobj.unsubscribe();
      }
  }
}
