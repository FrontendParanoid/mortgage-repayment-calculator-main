import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const IsNumber = (control: AbstractControl) => {
  if (isNaN(parseInt(control.value))) {
    return { isNan: true };
  }
  return null;
};
