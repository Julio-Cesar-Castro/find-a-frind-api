import type { User } from '@/interfaces/user.ts'
import type { UserRepository } from '../user-repository.ts'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(data: User) {
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      city: data.city,
      phone: data.phone,
      created_at: data.created_at,
      birthday: data.birthday,
      role: data.role,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
