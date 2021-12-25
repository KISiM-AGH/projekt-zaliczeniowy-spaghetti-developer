import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import {
  UserData,
  UserDataWithPriviliges,
  UserLoginData,
  UserRegisterData,
} from '../dtos';

@Injectable()
export class UserApiService {
  constructor(private http: HttpClient) {}

  public register(userData: UserRegisterData): Promise<void> {
    return firstValueFrom(
      this.http.post<void>('http://localhost:4200/api/user/register', userData)
    );
  }

  public login(userData: UserLoginData): Promise<UserData> {
    return firstValueFrom(
      this.http
        .post<UserDataWithPriviliges>(
          'http://localhost:4200/api/user/login',
          userData
        )
        .pipe(
          map((res) => ({
            ...res,
            isAdmin: !!res.Priviliges.find(
              (privilige) => privilige.code === 'admin-privilige'
            ),
          }))
        )
    );
  }

  public getUser(): Promise<UserData> {
    return firstValueFrom(
      this.http
        .get<UserDataWithPriviliges>('http://localhost:4200/api/user/')
        .pipe(
          map((res) => ({
            ...res,
            isAdmin: !!res.Priviliges.find(
              (privilige) => privilige.code === 'admin-privilige'
            ),
          }))
        )
    );
  }
}
