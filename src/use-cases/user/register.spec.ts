import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository.ts'
import { CreateUserUseCase } from './register.ts'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Unit Test User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should create a user', async () => {
    const { user } = await sut.execute({
      id: randomUUID(),
      birthday: String(new Date('2002-24-09')),
      city: 'Salto',
      created_at: String(new Date()),
      email: 'JohnDoe@example.com',
      name: 'John Doe',
      password: '12345678',
      phone: '00000000000',
      role: 'USER',
    })

    expect(user.name).toBe('John Doe')
    expect(user.role).toBe('USER')
  })
})
