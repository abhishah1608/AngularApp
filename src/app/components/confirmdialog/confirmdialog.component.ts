import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../../services/global.service';
import { ReadlocalfileService } from '../../services/readlocalfile.service';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmdialogComponent implements OnInit {

  message: string;

  language: string;

  showOk: boolean;

  externalfilestring: string;

  title = 'Are you sure?';

  strNo = 'No';

  strYes = 'Yes';

  strOk = 'Ok';

  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private global: GlobalService, private fileread: ReadlocalfileService) { }

  ngOnInit() {
    this.message = this.data.message;
    this.showOk = this.data.okbutton;
    const filepath = this.global.translatorfilepath + 'Dialogmsg.json';
    this.fileread.ReadFile(filepath).subscribe((content) => {
      this.externalfilestring = content;
    });
    this.language = this.global.language;
  }

  onNoClick() {
    this.dialogRef.close({response: '0'});
  }

  onYesClick() {
    this.dialogRef.close({response: '1'});
  }

}
