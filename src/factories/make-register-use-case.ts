import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { RegisterUseCase } from '@/use-cases/user/register.ts'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
