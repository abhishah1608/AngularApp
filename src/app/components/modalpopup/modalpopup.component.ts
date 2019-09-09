import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { ReadlocalfileService } from '../../services/readlocalfile.service';


@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {

  @Input() title;

  @Input() body;

  @Input() modaltype;

  @Input() dialogId;


  strNo = 'No';

  strYes = 'Yes';

  strOk = 'Ok';

  language = '';

  externalfilestring = '';

  ngOnInit() {
    const filepath = this.global.translatorfilepath + 'Dialogmsg.json';
    this.fileread.ReadFile(filepath).subscribe((content) => {
      this.externalfilestring = content;
    });
    this.language = this.global.language;
   }

  // tslint:disable-next-line:max-line-length
  constructor(private activeModal: NgbActiveModal, private router: Router, private global: GlobalService, private fileread: ReadlocalfileService) {

  }

  ok(): void {
    this.activeModal.close();
    // call api if required.
    this.router.navigate(['logout']);
  }

  Yes(): void {

     this.activeModal.close();
  }

  No(): void {
     this.activeModal.close();
     // nothing to do.
  }
}
