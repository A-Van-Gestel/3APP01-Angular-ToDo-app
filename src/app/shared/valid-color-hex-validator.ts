import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function validColorHexValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const isValidColorHex = /^#[0-9A-F]{6}$/i.test(value);  // https://stackoverflow.com/a/8027444

    const colorHexValid = isValidColorHex;

    return !colorHexValid ? {validColorHex: true} : null;
  };
}
