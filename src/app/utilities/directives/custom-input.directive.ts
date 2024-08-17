import {
  Directive,
  ElementRef,
  HostListener,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCustomInput]',
  standalone: true,
})
export class CustomInputDirective {
  constructor(private render: Renderer2, private el: ElementRef) {}

  @HostListener('click', ['$event.target']) OnClick(event: Event) {
    const parentElement = this.el.nativeElement as HTMLDivElement;
    const spanElement = parentElement.lastChild as HTMLSpanElement;
    const inputElement = parentElement.firstChild as HTMLInputElement;

    this.render.setStyle(inputElement, 'border', '1px solid hsl(61, 70%, 52%)');

    this.render.setStyle(
      spanElement,
      'border-bottom',
      '1px solid hsl(61, 70%, 52%)'
    );
    this.render.setStyle(spanElement, 'background-color', 'hsl(61, 70%, 52%)');
    this.render.setStyle(spanElement, 'color', 'hsl(202, 55%, 16%)');
  }

  @HostListener('keydown', ['$event']) OnInput(event: KeyboardEvent) {
    const inputEl = event.target as HTMLInputElement;
    const key = event.key;
    const pattern = '^[0-9]+$';
    var regex = new RegExp(pattern);
    if (key === '0' && !inputEl.value) {
      event.preventDefault();
    }

    if (
      regex.test(key) ||
      [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
        'Enter',
        'CapsLock',
        '.',
      ].includes(key)
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
