import { NgModule } from '@angular/core';

import { SignInRoutingModule } from './sign-in-routing.module';
import { FormModule } from '@auth/form/form.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    SignInRoutingModule,
    FormModule
  ]
})
export class SignInModule { }
