import type { PetRepository } from '../../repositories/pet-repository.ts'
import type { Pet } from '@/interfaces/pet.ts'

interface SearchPetByQueryRequest {
  query: string
}

interface SearchPetByQueryResponse {
  pet: Pet[] | null
}

export class ListPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    query,
  }: SearchPetByQueryRequest): Promise<SearchPetByQueryResponse> {
    const pet = await this.petRepository.searchPetByQuery(query)

    return { pet }
  }
}
