import { Injectable } from '@angular/core';
import { UserApiService } from '../api-services';
import { UserData, UserLoginData } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user?: UserData | undefined;
  public async getUser(): Promise<UserData | undefined> {
    if (!this._user && localStorage.getItem('auth-token')) {
      this._user = await this.apiService.getUser();
    }
    return this._user;
  }

  constructor(private apiService: UserApiService) {}

  public async login(userData: UserLoginData): Promise<void> {
    this._user = await this.apiService.login(userData);
    console.log(this._user);
    this.setSession(this._user.token);
  }

  public logout(): void {
    this._user = undefined;
    localStorage.removeItem('auth-token');
  }

  private setSession(token: string): void {
    localStorage.setItem('auth-token', token);
  }
}
