import type { Organization } from '@/interfaces/organization.ts'
import type { OrganizationRepository } from '../repositories/organization-repository.ts'

interface CreateOrganizationRequest {
  id: string
  name_responsible: string
  email: string
  password: string
  city: string
  address: string
  number: number
  district: string
  zipcode: number
  phone: string
  created_at: string
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
    created_at,
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
      created_at,
      email,
      password,
      role,
    })

    return { organization }
  }
}
