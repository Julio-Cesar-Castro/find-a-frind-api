import type { Organization } from '@/interfaces/organization.ts'
import type { OrganizationRepository } from '../organization-repository.ts'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: Organization[] = []

  async create(data: Organization) {
    const organization = {
      id: data.id,
      name_responsible: data.name_responsible,
      email: data.email,
      password: data.password,
      city: data.city,
      address: data.address,
      number: data.number,
      district: data.district,
      zipcode: data.zipcode,
      phone: data.phone,
      created_at: data.created_at,
      cnpj: data.cnpj,
      role: data.role,
    }

    this.items.push(organization)

    return organization
  }

  async findByCNPJ(cnpj: number) {
    const organization = this.items.find((item) => item.cnpj === cnpj)

    if (!organization) {
      return null
    }

    return organization
  }
}
