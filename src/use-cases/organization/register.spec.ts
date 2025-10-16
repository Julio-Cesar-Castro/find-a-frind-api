import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory/in-memory-organization-repository.ts'
import { CreateOrganizationUseCase } from './register.ts'
import { randomUUID } from 'node:crypto'

let organizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Unit Test Organization', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should create a organization', async () => {
    const { organization } = await sut.execute({
      id: randomUUID(),
      name_responsible: 'Org amigos',
      address: 'Rua 1',
      district: 'São Paulo',
      number: 124,
      phone: '12345678910',
      zipcode: '13327464',
      city: 'SP',
      cnpj: 52702990000103,
      createdAt: new Date(),
      email: 'org.example@example.com',
      password: '12345678',
      role: 'ADMIN',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: organization.id,
        name_responsible: 'Org amigos',
        address: 'Rua 1',
        district: 'São Paulo',
        number: 124,
        phone: '12345678910',
        zipcode: '13327464',
        city: 'SP',
        cnpj: 52702990000103,
        createdAt: organization.createdAt,
        email: 'org.example@example.com',
        password: '12345678',
        role: 'ADMIN',
      }),
    )
    expect(organization.role).toBe('ADMIN')
  })
})
