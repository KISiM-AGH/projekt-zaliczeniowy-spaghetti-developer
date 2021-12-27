import { ImageData } from './image.interfaces';

export interface AdvertisementFormData {
  title: String;
  description: String;
  price: number;
  contact: String;
  address: String;
  images: ImageData[] | String[];
}

export interface AdvertisementData extends AdvertisementFormData {
  guid: String;
  images: String[];
  userGuid: String;
}
