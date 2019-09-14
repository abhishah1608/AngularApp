import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { GlobalService } from './global.service';
import { PaymentInfo } from '../model/payment-info';
import { PaymentForm } from '../model/payment-form';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: string =  this.global.baseurlservice + 'Payment/';

  constructor(private httpclient: HttpClient, private global: GlobalService) { }

  Generateform(payment: PaymentForm): Observable<PaymentForm> {

    const urlpath = this.url + 'Generateform';
    const httpOptions = {
      headers: new HttpHeaders({accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    })
    };

    return this.httpclient.post<PaymentForm>(urlpath, payment, httpOptions);
  }

  GetPaymentStatus(payumoneyId: number): Observable<PaymentInfo> {
    const urlpath = this.url + 'GetPaymentDetail' + '?payumoneyId=' + payumoneyId;
    const httpOptions = {
      headers: new HttpHeaders({accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    })
    };

    return this.httpclient.get<PaymentInfo>(urlpath, httpOptions);
  }

}
