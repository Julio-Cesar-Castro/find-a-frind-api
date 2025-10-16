import type { User } from '@prisma/client'
import type { UserRepository } from '../user-repository.ts'
import { prisma } from '@/lib/prisma.ts'

export class PrismaUsersRepository implements UserRepository {
  async create(data: User) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const hasUserAlreadyRegister = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return hasUserAlreadyRegister
  }
}
