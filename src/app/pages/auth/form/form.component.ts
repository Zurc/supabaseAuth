import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACTIONS } from '@shared/constants/constants';

export interface OptionsForm {
  id: string,
  label: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() options!: OptionsForm;
  authForm!: FormGroup;
  private formSubmitAttempt!: boolean;

  signIn = ACTIONS.signIn;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    console.log('Save', this.authForm.value);
    this.formSubmitAttempt = true;
  }

  initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  isFieldInvalid(field: string) {
    return (
      (!this.authForm.get(field)!.valid && this.authForm.get(field)!.touched) ||
      (this.authForm.get(field)!.untouched && this.formSubmitAttempt)
    );
  }
}
