import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
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
      this.http
        .get<AdvertisementData>(
          `http://localhost:4200/api/advertisements/${guid}`
        )
        .pipe(
          map((res) => ({
            ...res,
            images: res.images.map(
              (image: any) => `http://localhost:4200/api/images/${image.guid}`
            ),
          }))
        )
    );
  }

  public uploadFile(formData: FormData): Promise<{ guid: String }> {
    return firstValueFrom(
      this.http.post<{ guid: String }>(
        `http://localhost:4200/api/images`,
        formData
      )
    );
  }
}
