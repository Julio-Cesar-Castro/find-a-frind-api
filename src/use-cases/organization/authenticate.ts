import type { OrganizationRepository } from '../repositories/organization-repository.ts'
import type { Organization } from '@/interfaces/organization.ts'
import { compare } from 'bcrypt'
import { OrganizationInvalidCredentials } from '../errors/organization-invalid-credentials.ts'

interface AuthenticateOrganizatonRequest {
  cnpj: number
  password: string
}

interface AuthenticateOrganizatonResponse {
  organization: Organization
}

export class AuthenticateOrganizatonUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    cnpj,
    password,
  }: AuthenticateOrganizatonRequest): Promise<AuthenticateOrganizatonResponse> {
    const organization = await this.organizationRepository.findByCNPJ(cnpj)

    if (!organization) {
      throw new OrganizationInvalidCredentials()
    }

    const doesPasswordMatch = await compare(password, organization.password)

    if (!doesPasswordMatch) {
      throw new OrganizationInvalidCredentials()
    }

    return { organization }
  }
}
