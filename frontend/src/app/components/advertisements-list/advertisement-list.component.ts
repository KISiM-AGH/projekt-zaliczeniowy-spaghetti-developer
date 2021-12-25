import { Component } from '@angular/core';
import { AdvertisementApiService } from '../../api-services/advertisement-api.service';
import { AdvertisementData } from '../../dtos';

@Component({
  selector: 'advertisement-list',
  template: `<div class="advertisement-list">
    <advertisement-preview
      *ngFor="let item of advertisements"
      [item]="item"
    ></advertisement-preview>
  </div>`,
  styleUrls: [`./advertisements-list.component.scss`],
})
export class AdvertisementListComponent {
  public advertisements: AdvertisementData[] = [];

  constructor(private apiService: AdvertisementApiService) {
    this.apiService
      .getAdvertisements()
      .then((res) => (this.advertisements = res));
  }
}
