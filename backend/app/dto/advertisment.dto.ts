export interface AdvertismentDto {
  guid: string;
  title: string;
  createdOn: Date;
  userGuid: string;
  description: string;
  price: number;
  contact: string;
  address: string;
  mainImage: string;
  images: string[];
}
