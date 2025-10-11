export interface Organization {
  id: string
  name_responsible: string
  email: string
  password: string
  city: string
  address: string
  number: number
  district: string
  zipcode: number
  phone: string
  created_at: string
  cnpj: number
  role: 'ADMIN' | 'USER'
}
