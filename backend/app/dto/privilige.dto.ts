export enum BasicPriviliges {
  Admin = 1,
}

export interface PriviligeDto {
  id: BasicPriviliges;
  name: string;
}
