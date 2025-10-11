import type { User } from '@/interfaces/user.ts'
import type { UserRepository } from '../repositories/user-repository.ts'
import { hash } from 'bcrypt'

interface CreateUserRequest {
  id: string
  name: string
  email: string
  password: string
  city: string
  phone: string
  created_at: string
  birthday: string
  role: 'ADMIN' | 'USER'
}

interface CreateUserResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    birthday,
    city,
    created_at,
    email,
    id,
    name,
    password,
    phone,
    role,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      birthday,
      city,
      created_at,
      email,
      id,
      name,
      password: password_hash,
      phone,
      role,
    })

    return { user }
  }
}
