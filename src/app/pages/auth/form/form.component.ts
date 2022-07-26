import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ACTIONS } from '@shared/constants/constants';
import { ApiError, User, UserCredentials } from '@supabase/supabase-js';

export interface OptionsForm {
  id: string;
  label: string;
}

interface UserResponse extends User, ApiError {}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() options!: OptionsForm;
  authForm!: FormGroup;
  private formSubmitAttempt!: boolean;
  durationInSeconds = 5;

  signIn = ACTIONS.signIn;

  constructor(
    private readonly authSvc: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    const credentials: UserCredentials = this.authForm.value;
    let actionToCall;

    if (this.options.id === ACTIONS.signIn) {
      actionToCall = this.authSvc.signIn(credentials);
    } else {
      actionToCall = this.authSvc.signUp(credentials);
    }

    try {
      const result = (await actionToCall) as UserResponse;
      if (result.email) {
        this.redirectUser();
        console.log('home ->');
      } else {
        this.snackBar.open(result.message, '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: this.durationInSeconds * 1000,
        })
        console.log('notification ->');
      }
    } catch (error) {
      console.log(error);
    }

    this.formSubmitAttempt = true;
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private redirectUser(): void {
    this.router.navigate(['/home']);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.authForm.get(field)!.valid && this.authForm.get(field)!.touched) ||
      (this.authForm.get(field)!.untouched && this.formSubmitAttempt)
    );
  }
}
