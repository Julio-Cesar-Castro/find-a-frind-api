import type { Pet, Prisma } from '@prisma/client'
import type { PetRepository } from '../pet-repository.ts'
import { prisma } from '@/lib/prisma.ts'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findPetByCity(city: string) {
    const pet = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pet
  }

  async findPetById(id: string) {
    const pet = await prisma.pet.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return pet
  }

  searchPetByQuery(query: string): Promise<Pet[] | null> {
    throw new Error('Method not implemented.')
  }
}
