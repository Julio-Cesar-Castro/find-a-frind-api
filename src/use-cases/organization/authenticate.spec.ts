import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcrypt'
import { AuthenticateOrganizatonUseCase } from './authenticate.ts'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory/in-memory-organization-repository.ts'
import { OrganizationInvalidCredentials } from '../errors/organization-invalid-credentials.ts'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizatonUseCase

describe('Unit Test Organization Login', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizatonUseCase(organizationRepository)
  })

  it('should authenticate a organization', async () => {
    await organizationRepository.create({
      id: randomUUID(),
      address: 'Rua X',
      city: 'Salto',
      cnpj: 527200980000101,
      createdAt: new Date(),
      district: 'Bairro',
      email: 'organization@example.com',
      name_responsible: 'João',
      number: 21,
      password: await hash('12345678', 6),
      phone: '00000000000',
      role: 'ADMIN',
      zipcode: '13327464',
    })

    const { organization } = await sut.execute({
      cnpj: 527200980000101,
      password: '12345678',
    })

    expect(organization.cnpj).toBe(527200980000101)
  })

  it('should throw error if CNPJ is incorrect organization', async () => {
    await organizationRepository.create({
      id: randomUUID(),
      address: 'Rua X',
      city: 'Salto',
      cnpj: 527200980000101,
      createdAt: new Date(),
      district: 'Bairro',
      email: 'organization@example.com',
      name_responsible: 'João',
      number: 21,
      password: await hash('12345678', 6),
      phone: '00000000000',
      role: 'ADMIN',
      zipcode: '13327464',
    })

    await expect(async () =>
      sut.execute({
        cnpj: 1213214124,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(OrganizationInvalidCredentials)
  })

  it('should throw error if Password is incorrect organization', async () => {
    await organizationRepository.create({
      id: randomUUID(),
      address: 'Rua X',
      city: 'Salto',
      cnpj: 527200980000101,
      createdAt: new Date(),
      district: 'Bairro',
      email: 'organization@example.com',
      name_responsible: 'João',
      number: 21,
      password: await hash('12345678', 6),
      phone: '00000000000',
      role: 'ADMIN',
      zipcode: '13327464',
    })

    await expect(async () =>
      sut.execute({
        cnpj: 527200980000101,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(OrganizationInvalidCredentials)
  })
})
