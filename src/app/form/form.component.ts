import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.validateEmail]],
      nif: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      password: ['', { validators: [Validators.required, this.passwordValidator] }]
    });
  }

  submitForm() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      console.log("Form concluído");
      this.submitted = true;
    }
  }

  validateEmail(control: FormControl): {[key: string]: any} | null {
    const email = control.value;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const hasSpecial = /[\W]/.test(value);

    const valid = hasUppercase && hasLowercase && hasDigit && hasSpecial;
    return valid ? null : { passwordInvalid: true };
  }

  get name() {
    return this.myForm.get('name') as FormControl;
  }

  get email() {
    return this.myForm.get('email') as FormControl;
  }

  get password() {
    return this.myForm.get('password') as FormControl;
  }
}
