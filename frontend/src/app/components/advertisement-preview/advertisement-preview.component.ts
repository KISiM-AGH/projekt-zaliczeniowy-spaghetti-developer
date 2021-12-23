import { Component, Input } from '@angular/core';
import { AdvertisementData } from '../../dtos';

@Component({
  selector: 'advertisement-preview',
  templateUrl: './advertisement-preview.component.html',
  styleUrls: ['./advertisement-preview.component.scss'],
})
export class AdvertisementPreviewComponent {
  @Input() public item!: AdvertisementData;
}
