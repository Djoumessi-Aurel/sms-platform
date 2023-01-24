import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective {
  private isShown: boolean = false;
  constructor(private element: ElementRef) {
    this.setup();
   }

   toggle(span: HTMLElement) {
    this.isShown = !this.isShown;
    if (this.isShown) {
      this.element.nativeElement.setAttribute('type', 'text');
      span.innerHTML = `<div class="pl-4 mt-1" style="font-size:1em"><input type="checkbox" class="form-check-input" id="check" class="" checked><label class="form-check-label" for="check">Show password</label></div>`;
    } else {
      this.element.nativeElement.setAttribute('type', 'password');
      span.innerHTML = `<div class="pl-4 mt-1" style="font-size:1em"><input type="checkbox" class="form-check-input" id="check" class=""><label class="form-check-label" for="check">Show password</label></div>`;
    }
  }
   setup() {
    const parent = this.element.nativeElement.parentNode;
    const span = document.createElement('p');
    span.innerHTML = `<div class="pl-4 mt-1" style="font-size:1em"><input type="checkbox" class="form-check-input"  class=""><label class="form-check-label" for="check">Show password</label></div>`;
    span.addEventListener('click', (event) => {
      this.toggle(span)
    });
    parent.appendChild(span);
  }
}
