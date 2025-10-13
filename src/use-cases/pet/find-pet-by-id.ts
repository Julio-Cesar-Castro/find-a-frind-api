import type { PetRepository } from '../repositories/pet-repository.ts'
import type { Pet } from '@/interfaces/pet.ts'

interface FindPetByIdRequest {
  id: string
}

interface FindPetByIdResponse {
  pet: Pet | null
}

export class FindPetByIdUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: FindPetByIdRequest): Promise<FindPetByIdResponse> {
    const pet = await this.petRepository.findPetById(id)

    return { pet }
  }
}
