import type { User } from '@/interfaces/user.ts'

export interface UserRepository {
  create(data: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
