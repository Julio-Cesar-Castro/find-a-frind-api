export interface User {
  name: string
  email: string
  password: string
  birthday: string
  city: string
  role: 'ADMIN' | 'USER'
  phone: string
}
