export interface Organization {
  id: string
  name_responsible: string
  email: string
  password: string
  city: string
  address: string
  number: number
  district: string
  zipcode: string
  phone: string
  createdAt: Date
  cnpj: number
  role: 'ADMIN' | 'USER'
}
