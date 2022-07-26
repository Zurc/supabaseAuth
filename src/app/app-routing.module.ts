import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'sign-in',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/auth/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/auth/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
