import { JwtPayload } from 'jsonwebtoken';

export interface UserDto {
  guid?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthorizedUserDto extends UserDto {
  token: string | JwtPayload;
}
