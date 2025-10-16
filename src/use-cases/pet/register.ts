import type { Prisma } from '@prisma/client'
import type { PetRepository } from '../../repositories/pet-repository.ts'
import type { Pet } from '@/interfaces/pet.ts'

interface CreatePetRequest {
  id: string
  name: string
  birthday: string
  city: string
  petSize: 'SMALL' | 'MEDIUM' | 'BIG'
  description: string
  requirement: string
  createdAt: Date
  updatedAt: Date
  organizationId: string
  userId?: string | null
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
    petSize,
    description,
    requirement,
    organizationId,
    userId,
    createdAt,
    updatedAt,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petRepository.create({
      id,
      name,
      birthday,
      city,
      petSize,
      description,
      requirement,
      organizationId,
      userId: userId ?? null,
      createdAt,
      updatedAt,
    })

    return { pet }
  }
}
