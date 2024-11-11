export interface Product {
  id: string
  title: string
  description: string
  price: string
  rating: string
  thumbnail: string
  stock: string
}

export interface RawProduct {
  id: number
  title: string
  description: string
  price: number
  rating: number
  thumbnail: string
  stock: number
}
