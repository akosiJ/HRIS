import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const name = control.value;
  const regex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  if (!name || !regex.test(name)) {
    return { invalidName: true };
  }

  return null;
}

export function mobileNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const mobileNumber = control.value;
  const regex = /^9\d{9}$/;

  if (!mobileNumber || !regex.test(mobileNumber)) {
    return { invalidMobileNumber: true };
  }

  return null;
}
