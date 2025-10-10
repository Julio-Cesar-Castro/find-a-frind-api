import type { Organization } from '@/interfaces/organization.ts'

export class InMemoryOrganizationRepository {
  public items: Organization[] = []

  async create(data: Organization) {
    const organization = {
      id: data.id,
      name: data.name,
      address: data.address,
      number: data.number,
      district: data.district,
      zipcode: data.zipcode,
      phone: data.phone,
    }

    this.items.push(organization)

    return organization
  }
}
