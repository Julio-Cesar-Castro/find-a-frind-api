import type { Organization } from '@/interfaces/organization.ts'

export interface OrganizationRepository {
  create(data: Organization): Promise<Organization>
  findByCNPJ(cnpj: number): Promise<Organization | null>
}
