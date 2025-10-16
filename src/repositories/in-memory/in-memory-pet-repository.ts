import type { Pet } from '@prisma/client'
import type { PetRepository } from '../pet-repository.ts'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Pet) {
    const pet = {
      id: data.id,
      name: data.name,
      birthday: data.birthday,
      city: data.city,
      petSize: data.petSize,
      description: data.description,
      requirement: data.requirement,
      organizationId: data.organizationId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      userId: data.userId,
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
        item.petSize.includes(query) ||
        item.birthday.includes(query) ||
        item.requirement.includes(query),
    )

    if (!pet) {
      return null
    }

    return pet
  }
}
