import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository.ts'
import { CreatePetUseCase } from './register.ts'
import { InMemoryOrganizationRepository } from '../repositories/in-memory/in-memory-organization-repository.ts'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: CreatePetUseCase

describe('Unit Test Find Pet By Id', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreatePetUseCase(petRepository)
  })

  it('should find a pets by id', async () => {
    const organization = await organizationRepository.create({
      id: randomUUID(),
      name_responsible: 'Org amigos',
      address: 'Rua 1',
      district: 'São Paulo',
      number: 124,
      phone: '12345678910',
      zipcode: 13327464,
      city: 'SP',
      cnpj: 52702990000103,
      created_at: String(new Date()),
      email: 'org.example@example.com',
      password: '12345678',
      role: 'ADMIN',
    })

    const { pet } = await sut.execute({
      id: randomUUID(),
      birthday: String(new Date('2020-02-24')),
      city: 'Salto',
      created_at: String(new Date()),
      updated_at: String(new Date()),
      description: 'Amigo da vizinhança',
      name: 'Porco aranha',
      pet_size: '80cm',
      organization_id: organization.id,
      requirement: 'Ambiente amigável',
    })

    const returnedPet = await petRepository.findPetById(pet.id)

    expect(returnedPet!.name).toEqual(pet.name)
  })
})
