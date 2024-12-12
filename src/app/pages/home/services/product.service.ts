import { baseEndpointUrl } from '@/constants'
import { LoginService } from '@/pages/login/services/login.service'
import { HttpClient } from '@angular/common/http'
import { Injectable, afterNextRender, inject } from '@angular/core'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import type { NewProduct, Product } from '../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient)
  private loginService = inject(LoginService)
  private router = inject(Router)
  private products: Product[] = []

  constructor() {
    afterNextRender(() => {
      this.fetchProducts()
    })
  }

  updateProduct(product: Product) {
    this.httpClient
      .put(`${baseEndpointUrl}/api/product/${product.id}`, product)
      .subscribe({
        error() {
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: 'Hubo un error interno al actualizar el producto. Intente más tarde'
          })
        },
        next() {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Producto actualizado correctamente'
          })
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
      .delete(`${baseEndpointUrl}/api/product/${product.id}`)
      .subscribe({
        error() {
          // alert(
          //   'Hubo un error interno al eliminar el producto. Intente más tarde'
          // )
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: 'Hubo un error interno al eliminar el producto. Intente más tarde'
          })
        },
        next() {
          // alert('Producto eliminado correctamente')
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Producto eliminado correctamente'
          })
        }
      })

    this.products = this.products.filter(pr => pr.id !== product.id)
  }

  fetchProducts() {
    this.httpClient.get<Product[]>(`${baseEndpointUrl}/api/product`).subscribe({
      next: data => {
        for (const product of data) {
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

  postProduct(newProduct: NewProduct) {
    this.httpClient
      .post<Product[]>(`${baseEndpointUrl}/api/product/`, newProduct)
      .subscribe({
        next: products => {
          const product = products[0]
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Producto agregado correctamente'
          })

          this.products.push({
            id: product.id.toString(),
            title: product.title,
            description: product.description,
            price: product.price.toString(),
            rating: product.rating.toString(),
            thumbnail: product.thumbnail,
            stock: product.stock.toString()
          })

          this.router.navigate([`home/get-product/${product?.id}`])
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: 'Hubo un error interno al cargar el producto. Intente más tarde'
          })
        }
      })
  }
}
