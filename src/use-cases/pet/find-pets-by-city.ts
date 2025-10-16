import type { Pet } from '@prisma/client'
import type { PetRepository } from '../../repositories/pet-repository.ts'

interface FindPetByCityRequest {
  city: string
}

interface FindPetByCityResponse {
  pet: Pet[] | null
}

export class ListPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
  }: FindPetByCityRequest): Promise<FindPetByCityResponse> {
    const pet = await this.petRepository.findPetByCity(city)

    return { pet }
  }
}
