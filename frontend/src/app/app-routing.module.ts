import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdvertisementFormComponent,
  AdvertisementComponent,
  AdvertisementListComponent,
  LoginPageComponent,
  LogoutPageComponent,
  MainPageComponent,
  RegisterPageComponent,
} from './components';
import { AuthGuardService } from './guards';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: AdvertisementListComponent },
      {
        path: 'advertisement',
        children: [
          { path: 'edit/:id', component: AdvertisementFormComponent },
          { path: 'add', component: AdvertisementFormComponent },
          { path: ':id', component: AdvertisementComponent },
        ],
      },
      { path: '**', redirectTo: '/' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
