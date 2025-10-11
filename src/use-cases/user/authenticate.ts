import type { User } from '@/interfaces/user.ts'
import type { UserRepository } from '../repositories/user-repository.ts'
import { UserInvalidCredentials } from '../errors/user-invalid-credentials.ts'
import { compare } from 'bcrypt'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserInvalidCredentials()
    }

    const doesPasswordMatch = await compare(password, user.password)

    if (!doesPasswordMatch) {
      throw new UserInvalidCredentials()
    }

    return { user }
  }
}
