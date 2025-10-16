export interface Pet {
  id: string
  name: string
  birthday: string
  city: string
  petSize: 'SMALL' | 'MEDIUM' | 'BIG'
  description: string
  requirement: string
  createdAt: Date
  updatedAt: Date
  organizationId: string
  userId?: string | null
}
