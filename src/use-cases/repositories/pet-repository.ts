import type { Pet } from '@/interfaces/pet.ts'

export interface PetRepository {
  create(data: Pet): Promise<Pet>
  listPetByCity(city: string): Promise<Pet[] | null>
}
