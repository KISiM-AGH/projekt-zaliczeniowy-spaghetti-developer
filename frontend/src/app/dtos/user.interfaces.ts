export interface UserRegisterData extends UserLoginData {
  firstName: String;
  lastName: String;
}

export interface UserLoginData {
  email: String;
  password: String;
}

export interface UserData extends UserRegisterData {
  guid: String;
  token: string;
}
