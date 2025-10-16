import type { Organization, Prisma } from '@prisma/client'
import type { OrganizationRepository } from '../organization-repository.ts'
import { prisma } from '@/lib/prisma.ts'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByCNPJ(cnpj: number) {
    const organization = await prisma.organization.findFirstOrThrow({
      where: {
        cnpj,
      },
    })

    return organization
  }
}
