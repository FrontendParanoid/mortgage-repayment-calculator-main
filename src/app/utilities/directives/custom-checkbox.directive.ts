import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomCheckbox]',
  standalone: true,
})
export class CustomCheckboxDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event']) OnClick(event: Event) {
    const parentElement = this.el.nativeElement as HTMLDivElement;
    this.renderer.setStyle(
      parentElement,
      'border',
      '1px solid hsl(61, 70%, 52%)'
    );

    this.renderer.setStyle(
      parentElement,
      'background',
      'hsla(61, 70%, 52%, 0.3)'
    );
  }
}
