import { Injectable } from '@angular/core';
import { UserApiService } from '../api-services';
import { UserData, UserLoginData } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: UserData;
  constructor(private apiService: UserApiService) {}

  public async login(userData: UserLoginData): Promise<void> {
    this.user = await this.apiService.login(userData);
    this.setSession(this.user.token);
  }

  public logout(): void {
    this.user = undefined;
    localStorage.removeItem('auth-token');
  }

  private setSession(token: string): void {
    localStorage.setItem('auth-token', token);
  }
}
