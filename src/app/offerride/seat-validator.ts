import { AbstractControl, ValidationErrors } from '@angular/forms';
export function seatValidator(control: AbstractControl): ValidationErrors | null {
  const value = Number(control.value);

  // Check if value is not a number or out of range
  if (isNaN(value) || value < 0 || value > 9) {
    return { seatRangeInvalid: true }; // return error key
  }

  return null; // valid
}