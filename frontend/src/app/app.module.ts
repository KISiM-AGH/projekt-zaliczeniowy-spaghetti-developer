import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AddAdvertisementComponent,
  AdvertisementComponent,
  AdvertisementListComponent,
  AdvertisementPreviewComponent,
  InputWrapperComponent,
  LoginPageComponent,
  MainPageComponent,
  NavbarComponent,
  RegisterPageComponent,
} from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService, AuthService } from './guards';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AdvertisementApiService, UserApiService } from './api-services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services';
import { AuthInterceptor } from './services/auth.interceptor';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    AppComponent,
    InputWrapperComponent,
    NavbarComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddAdvertisementComponent,
    AdvertisementComponent,
    AdvertisementPreviewComponent,
    AdvertisementListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    InputTextareaModule,
    DragDropModule,
    IvyCarouselModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
    AuthGuardService,
    AuthService,
    UserApiService,
    UserService,
    AdvertisementApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
