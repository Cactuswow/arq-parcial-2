import { baseEndpointUrl } from '@/constants'
import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import type { Product } from '../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient)
  private products: Product[] = []

  constructor() {
    this.httpClient.get(`${baseEndpointUrl}/products`).subscribe({
      next: data => {
        const { products } = data as { products: Product[] }
        this.products = products
      },
      error: () => {
        // alert('Error al obtener los productos')
      }
    })
  }

  get getProducts() {
    return this.products
  }
}
