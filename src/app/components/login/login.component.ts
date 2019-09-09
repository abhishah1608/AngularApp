import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';


import { UserDetail } from 'src/app/model/user-detail';
import { LoginModel } from 'src/app/model/login-model';
import { GlobalService } from 'src/app/services/global.service';
import { LoginService } from 'src/app/services/login.service';
import { ReadlocalfileService } from 'src/app/services/readlocalfile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  login: FormGroup;

  UserSignUp: FormGroup;

  loginmodel: LoginModel;

  IsSubmitted: boolean;

  IsSignUpSubmitted: boolean;

  IsIncorrectUsernamePassword = false;

  messageerrors = '';

  messageloginerrors = '';

  externalfilestring: string;

  language: string;

  loginsub: any;

  validationMessage = {
    loginUserName : {
      required: 'username must be required',
    },
    loginPass: {
      required: 'password must be required',
    }
  };

  formloginErrors = {
    loginUserName : '',
    loginPass: ''
  };

  formSignUpErrors = {
    SignUpUsername: '',
    SignUpPass: '',
    SignUpEmail: '',
    SignUpConfirmpass: ''
  };

  validationSignupMessage = {
    SignUpUsername : {
      required: 'username must be required',
    },
    SignUpPass: {
      required: 'password must be required',
    },
    SignUpEmail: {
      required: 'Email must be required',
    },
    SignUpConfirmpass : {
      required: 'confirm Password must be required',
    }
  };

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private global: GlobalService, private loginservice: LoginService, private fileread: ReadlocalfileService) {

  }

  // reading json file that has source english and for generating it will translate to different languages.
  ngOnInit(): void {

    const filepath = this.global.translatorfilepath + 'loginscreen.json';
    this.fileread.ReadFile(filepath).subscribe((content) => {
      this.externalfilestring = content;
    });

    this.language = this.global.language;

    this.UserSignUp = this.fb.group({
      SignUpUsername : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      SignUpEmail : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      SignUpPass : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      SignUpConfirmpass : ['', Validators.required]
    });

    this.login = this.fb.group({
      loginUserName : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      loginPass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.login.valueChanges.subscribe((data) => {
       this.logloginErrors();
    });
  }

  // on submit login
  Onlogin(): void {
      this.IsSubmitted = true;
      if (this.login.valid) {
        this.loginmodel = new LoginModel();
        this.loginmodel.username = this.login.get('loginUserName').value;
        this.loginmodel.password = this.login.get('loginPass').value;
        this.loginmodel.loginId = 0;
        const x = this.loginservice.IsuserAllowTologgedIn(this.loginmodel);
      } else {
        this.logloginErrors();
      }
  }

  logloginErrors(): void {
    this.messageloginerrors = '';
    if (this.login.get('loginUserName') &&  this.login.get('loginUserName').errors) {
        if (this.login.get('loginUserName').errors.required) {
            this.messageloginerrors = 'username must be required';
        } else if (this.login.get('loginUserName').errors.minlength) {
          this.messageloginerrors = 'username must have minimum 6 character length';
        } else if (this.login.get('loginUserName').errors.maxlenght) {
          this.messageloginerrors = 'username must have maximum 20 characters';
        }
    } else if (this.login.get('loginPass') && this.login.get('loginPass').errors) {
      if (this.login.get('loginPass').errors.required) {
        this.messageloginerrors = 'Password must be required';
      } else if (this.login.get('loginPass').errors.minlength) {
        this.messageloginerrors = 'password must have minimum 6 character length';
      } else if (this.login.get('loginPass').errors.maxlenght) {
        this.messageloginerrors = 'password must have maximum 20 characters';
      }
    }
  }

  OnSignUp(): boolean {
    this.IsSignUpSubmitted = true;
    let bRetval = false;
    if (this.UserSignUp.valid) {
       if (this.UserSignUp.get('SignUpPass').value !== this.UserSignUp.get('SignUpConfirmpass').value) {
            this.messageerrors = 'passowrd and confirm password must be same';
       } else {
          const detail: UserDetail = new UserDetail();
          detail.username = this.UserSignUp.get('SignUpUsername').value;
          detail.password = this.UserSignUp.get('SignUpPass').value;
          detail.email = this.UserSignUp.get('SignUpEmail').value;
          detail.Signup = 1;
          this.loginsub = this.loginservice.AddUser(detail).subscribe((retval) => {
            bRetval = retval;
          });
       }
     } else {
        this.showError();
     }
    return bRetval;
  }

  showErrorforspecificcontrol(key: string) {
     this.Isvalidcontrol(key);
  }

  showError(): void {
      let haserror = false;
      Object.keys(this.UserSignUp.controls).forEach((key: string) => {
      if (haserror === false) {
        haserror = this.Isvalidcontrol(key);
      }
   });
  }

  Isvalidcontrol(key: string): boolean {
    let haserror = false;
    const control = this.UserSignUp.get(key);
    this.formSignUpErrors[key] = '';
    this.messageerrors = '';
    if (control && !control.valid) {
         const message = this.validationSignupMessage[key];
         if (control.dirty || control.touched || this.IsSignUpSubmitted) {
            // tslint:disable-next-line:forin
            for (const errorkey in control.errors) {
              this.formSignUpErrors[key] = message[errorkey];
              this.messageerrors = message[errorkey];
              haserror = true;
              break;
            }
       }
      }
    return haserror;
  }

  ngOnDestroy(): void {
    if (this.loginsub) {
      this.loginsub.unsubscribe();
    }
  }
}
