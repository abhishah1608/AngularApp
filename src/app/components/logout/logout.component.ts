import { Component, OnInit } from '@angular/core';
import { SessiontimeoutService } from 'src/app/services/sessiontimeout.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private session: SessiontimeoutService, private loginservice: LoginService) {

  }
  ngOnInit() {
          this.session.close();
          this.loginservice.logout();
  }
}
