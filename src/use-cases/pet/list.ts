import type { PetRepository } from '../repositories/pet-repository.ts'
import type { Pet } from '@/interfaces/pet.ts'

interface ListPetRequest {
  city: string
}

interface ListPetResponse {
  pet: Pet[] | null
}

export class ListPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ city }: ListPetRequest): Promise<ListPetResponse> {
    const pet = await this.petRepository.listPetByCity(city)

    return { pet }
  }
}
