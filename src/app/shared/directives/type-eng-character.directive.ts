import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTypeEngCharacter]'
})
export class TypeEngCharacterDirective {

  regexStr = '^[a-zA-Z0-9_.,/()]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private el: ElementRef) { }

  @HostListener('keydown',['$event']) enter(event){
    // let e = <KeyboardEvent> event;
    // switch(e.keyCode){
    //   case 32:
    //     return false;
    // }
  }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    console.log(event)
    if(event.key == ' ') return true
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    // this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '')
        // .replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

}
