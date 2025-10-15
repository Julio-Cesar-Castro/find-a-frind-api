import type { Pet } from '@/interfaces/pet.ts'
import type { PetRepository } from '../pet-repository.ts'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Pet) {
    const pet = {
      id: data.id,
      name: data.name,
      birthday: data.birthday,
      city: data.city,
      pet_size: data.pet_size,
      description: data.description,
      requirement: data.requirement,
      organization_id: data.organization_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }

    this.items.push(pet)

    return pet
  }

  async findPetByCity(city: string) {
    const pet = this.items.filter((item) => item.city === city)

    return pet
  }

  async findPetById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchPetByQuery(query: string) {
    const pet = this.items.filter(
      (item) =>
        item.pet_size.includes(query) ||
        item.birthday.includes(query) ||
        item.requirement.includes(query),
    )

    if (!pet) {
      return null
    }

    return pet
  }
}
