interface ICreateUserTokenDTO {
  userId: string;
  expiration_date: Date;
  refresh_token: string;
}

export { ICreateUserTokenDTO };
