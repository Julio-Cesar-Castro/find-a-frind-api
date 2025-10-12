import type { PetRepository } from '../repositories/pet-repository.ts'
import type { Pet } from '@/interfaces/pet.ts'

interface CreatePetRequest {
  id: string
  name: string
  birthday: string
  city: string
  pet_size: string
  description: string
  requirement: string
  organization_id: string
  created_at: string
  updated_at: string
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    id,
    name,
    birthday,
    city,
    pet_size,
    description,
    requirement,
    organization_id,
    created_at,

    updated_at,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petRepository.create({
      id,
      name,
      birthday,
      city,
      pet_size,
      description,
      organization_id,
      requirement,
      created_at,
      updated_at,
    })

    return { pet }
  }
}
