import { NgModule } from '@angular/core';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { FormModule } from '@auth/form/form.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SignUpRoutingModule,
    FormModule
  ]
})
export class SignUpModule { }
