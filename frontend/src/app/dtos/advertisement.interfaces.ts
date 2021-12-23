import { ImageData } from './image.interfaces';

export interface AdvertisementAddData {
  title: String;
  description: String;
  price: number;
  contact: String;
  address: String;
  images: ImageData[] | String[];
}

export interface AdvertisementData extends AdvertisementAddData {
  guid: String;
  images: String[];
}
