import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomInput]',
  standalone: true,
})
export class CustomInputDirective {
  constructor(private render: Renderer2, private el: ElementRef) {}

  @HostListener('click', ['$event.target']) OnClick(event: Event) {
    console.log('invoked directive');
    this.render.setStyle(this.el.nativeElement, 'border', '1px solid lime');
  }
}
