import { baseEndpointUrl } from '@/constants'
import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import type { Product, RawProduct } from '../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private products: Product[] = []

  constructor() {
    this.fetchProducts()
  }

  updateProduct(product: Product) {
    this.httpClient
      .put(`${baseEndpointUrl}/products/${product.id}`, product)
      .subscribe({
        error() {
          alert(
            'Hubo un error interno al actualizar el producto. Intente más tarde'
          )
        },
        next() {
          alert('Producto actualizado correctamente')
        }
      })

    this.products = this.products.map(pr => {
      if (pr.id === product.id) {
        return product
      }
      return pr
    })
  }

  deleteProduct(product: Product) {
    this.httpClient
      .delete(`${baseEndpointUrl}/products/${product.id}`)
      .subscribe({
        error() {
          alert(
            'Hubo un error interno al eliminar el producto. Intente más tarde'
          )
        },
        next() {
          alert('Producto eliminado correctamente')
        }
      })

    this.products = this.products.filter(pr => pr.id !== product.id)
  }

  fetchProducts() {
    this.httpClient.get(`${baseEndpointUrl}/products`).subscribe({
      next: data => {
        const { products } = data as { products: RawProduct[] }
        for (const product of products) {
          this.products.push({
            id: product.id.toString(),
            title: product.title,
            description: product.description,
            price: product.price.toString(),
            rating: product.rating.toString(),
            thumbnail: product.thumbnail,
            stock: product.stock.toString()
          })
        }
      }
    })
  }

  get getProducts() {
    return this.products
  }

  postProduct(
    title: string,
    description: string,
    price: string,
    stock: string,
    thumbnail: string
  ) {
    this.httpClient
      .post(`${baseEndpointUrl}/products/add`, {
        title,
        description,
        price,
        stock,
        thumbnail
      })
      .subscribe({
        next: () => {
          alert('Producto agregado!')
          this.products.push({
            id: String(Number(this.products.at(-1)?.id) + 1),
            title,
            description,
            price,
            stock,
            thumbnail,
            rating: '0'
          })
          this.router.navigate(['home/get-products'])
        },
        error: () => {
          alert('ERROR: No se ha podido cargar el producto')
        }
      })
  }
}
