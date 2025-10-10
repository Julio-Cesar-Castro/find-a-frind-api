import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationRepository } from '../repositories/in-memory/in-memory-organization-repository.ts'
import { CreateOrganizationUseCase } from './create.ts'
import { randomUUID } from 'node:crypto'

let organizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Unit Test Organization', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should create and organization', async () => {
    const { organization } = await sut.execute({
      id: randomUUID(),
      name: 'Org amigos',
      address: 'Rua 1',
      district: 'São Paulo',
      number: 124,
      phone: '12345678910',
      zipcode: 13327464,
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Org amigos',
        address: 'Rua 1',
        district: 'São Paulo',
        number: 124,
        phone: '12345678910',
        zipcode: 13327464,
      }),
    )
  })
})
