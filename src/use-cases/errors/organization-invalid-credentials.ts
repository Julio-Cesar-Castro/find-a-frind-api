export class OrganizationInvalidCredentials extends Error {
  constructor() {
    super('CNPJ or password is wrong.')
  }
}
