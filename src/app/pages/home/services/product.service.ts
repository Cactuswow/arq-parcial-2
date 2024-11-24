import { baseEndpointUrl } from '@/constants'
import { HttpClient } from '@angular/common/http'
import { Injectable, afterNextRender, inject } from '@angular/core'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import type { NewProduct, Product, RawProduct } from '../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private products: Product[] = []
  productService: any

  constructor() {
    afterNextRender(() => {
      this.fetchProducts()
    })
  }

  updateProduct(product: Product) {
    this.httpClient
      .put(`${baseEndpointUrl}/products/${product.id}`, product)
      .subscribe({
        error() {
          // alert('Hubo un error interno al actualizar el producto. Intente más tarde')
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: 'Hubo un error interno al actualizar el producto. Intente más tarde'
          })
        },
        next() {
          // alert('Producto actualizado correctamente')
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
      .delete(`${baseEndpointUrl}/products/${product.id}`)
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

  postProduct(newProduct: NewProduct) {
    this.httpClient
      .post(`${baseEndpointUrl}/products/add`, newProduct)
      .subscribe({
        next: () => {
          // alert('Producto agregado!')
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Producto agregado correctamente'
          })

          this.products.push({
            id: String(Number(this.products.at(-1)?.id) + 1),
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price.toString(),
            rating: '0',
            thumbnail: newProduct.thumbnail,
            stock: newProduct.stock.toString()
          })

          console.log(this.products.at(-1)?.id);
          this.router.navigate([`home/get-product/${this.products.at(-1)?.id}`])
        },
        error: () => {
          // alert('ERROR: No se ha podido cargar el producto')
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: 'Hubo un error interno al cargar el producto. Intente más tarde'
          })
        }
      })
  }
}
