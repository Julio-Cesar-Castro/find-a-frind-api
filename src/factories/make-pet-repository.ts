import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository.ts'

export function makePetRepository() {
  const prismaPetRepository = new PrismaPetRepository()
}
