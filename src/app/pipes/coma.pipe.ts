import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coma',
  standalone: true,
})
export class ComaPipe implements PipeTransform {
  transform(value: string): string {
    let [integerPart, decimalPart] = value.split('.');
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let result = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

    if (value[value.length - 1] === '.' && value[value.length - 2] !== '.') {
      result += '.';
      return result;
    }

    if (isNaN(parseInt(integerPart) || parseInt(decimalPart))) {
      result = '';
    }
    console.log(`result: ${result}`);
    return result;
  }
}
