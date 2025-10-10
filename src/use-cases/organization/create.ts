import type { Organization } from '@/interfaces/organization.ts'
import type { OrganizationRepository } from '../repositories/organization-repository.ts'

interface CreateOrganizationRequest {
  id: string
  name: string
  address: string
  number: number
  district: string
  zipcode: number
  phone: string
}

interface CreateOrganizationResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    address,
    district,
    id,
    name,
    number,
    phone,
    zipcode,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const organization = await this.organizationRepository.create({
      address,
      district,
      id,
      name,
      number,
      phone,
      zipcode,
    })

    return { organization }
  }
}
