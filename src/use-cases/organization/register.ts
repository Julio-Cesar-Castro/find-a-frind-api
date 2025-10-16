import type { Organization } from '@/interfaces/organization.ts'
import type { OrganizationRepository } from '../../repositories/organization-repository.ts'

interface CreateOrganizationRequest {
  id: string
  name_responsible: string
  email: string
  password: string
  city: string
  address: string
  number: number
  district: string
  zipcode: string
  phone: string
  createdAt: Date
  cnpj: number
  role: 'ADMIN' | 'USER'
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
    name_responsible,
    number,
    phone,
    zipcode,
    city,
    cnpj,
    createdAt,
    email,
    password,
    role,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const organization = await this.organizationRepository.create({
      address,
      district,
      id,
      name_responsible,
      number,
      phone,
      zipcode,
      city,
      cnpj,
      createdAt,
      email,
      password,
      role,
    })

    return { organization }
  }
}
