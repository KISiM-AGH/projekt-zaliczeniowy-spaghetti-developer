import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserData, UserLoginData, UserRegisterData } from '../dtos';

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
      this.http.post<UserData>('http://localhost:4200/api/user/login', userData)
    );
  }
}
