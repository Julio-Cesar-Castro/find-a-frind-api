export class UserInvalidCredentials extends Error {
  constructor() {
    super('E-mail or password is wrong')
  }
}
