export interface AdvertisementAddData {
  title: String;
  description: String;
  price: Number;
  contact: String;
  address: String;
}

export interface AdvertisementData extends AdvertisementAddData {
  guid: String;
}
