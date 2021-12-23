import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementApiService } from '../../api-services';
import { AdvertisementData } from '../../dtos';

@Component({
  selector: 'component',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  public advertisement?: AdvertisementData;
  public images: String[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: AdvertisementApiService
  ) {}

  public async ngOnInit(): Promise<void> {
    const guid = this.activatedRoute.snapshot.paramMap.get('id');
    if (guid) {
      this.advertisement = await this.apiService.getAdvertisement(guid);
      this.images = this.advertisement.images;
    }
  }
}
