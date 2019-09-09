import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEmailValidation]'
})
export class EmailValidationDirective {

  @Input()
  appEmailValidation: boolean;

  constructor() { }

  @HostListener('blur', ['$event.target'])
  onblur(target: any) {
   console.log('target:' + target);
  }

}
