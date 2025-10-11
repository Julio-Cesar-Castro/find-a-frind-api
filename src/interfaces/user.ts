export interface User {
  id: string
  name: string
  email: string
  password: string
  birthday: string
  city: string
  role: 'ADMIN' | 'USER'
  phone: string
  created_at: string
}
