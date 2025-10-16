import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryPetRepository } from '../../repositories/in-memory/in-memory-pet-repository.ts'
import { CreatePetUseCase } from './register.ts'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory/in-memory-organization-repository.ts'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: CreatePetUseCase

describe('Unit Test User', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreatePetUseCase(petRepository)
  })

  it('should create a pet', async () => {
    const organization = await organizationRepository.create({
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

    const { pet } = await sut.execute({
      id: randomUUID(),
      birthday: String(new Date('2020-02-24')),
      city: 'Salto',
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Amigo da vizinhança',
      name: 'Porco aranha',
      petSize: 'SMALL',
      organizationId: organization.id,
      requirement: 'Ambiente amigável',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.organizationId).toBe(organization.id)
  })
})
