import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputTrim]'
})
export class InputTrimDirective {
  constructor(
    private el: ElementRef
  ) {}

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    const valueTrim = value.trim();
    if(value !== valueTrim) {
      this.el.nativeElement.value = valueTrim;
    }
  }  
}