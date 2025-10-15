import type { Pet } from '@/interfaces/pet.ts'

export interface PetRepository {
  create(data: Pet): Promise<Pet>
  findPetByCity(city: string): Promise<Pet[] | null>
  findPetById(id: string): Promise<Pet | null>
  searchPetByQuery(query: string): Promise<Pet[] | null>
}
