import type { User } from '@/interfaces/user.ts'
import type { UserRepository } from '../../repositories/user-repository.ts'
import { hash } from 'bcrypt'
import { UserAlreadyExist } from '../errors/user-already-exist.ts'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  city: string
  phone: string
  birthday: string
  role: 'ADMIN' | 'USER'
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    birthday,
    city,
    email,
    name,
    password,
    phone,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userAlreadyExist = await this.userRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new UserAlreadyExist()
    }

    const user = await this.userRepository.create({
      birthday,
      city,
      email,
      name,
      password: password_hash,
      phone,
      role,
    })

    return { user }
  }
}
