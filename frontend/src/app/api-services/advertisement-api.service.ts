import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdvertisementAddData, AdvertisementData } from '../dtos';

@Injectable()
export class AdvertisementApiService {
  constructor(private http: HttpClient) {}

  public add(advertisement: AdvertisementAddData): Promise<AdvertisementData> {
    return firstValueFrom(
      this.http.post<AdvertisementData>(
        'http://localhost:4200/api/advertisements',
        advertisement
      )
    );
  }

  public getAdvertisement(guid: string): Promise<AdvertisementData> {
    return firstValueFrom(
      this.http.get<AdvertisementData>(
        `http://localhost:4200/api/advertisements/${guid}`
      )
    );
  }
}
