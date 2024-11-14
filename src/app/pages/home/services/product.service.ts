import { baseEndpointUrl } from '@/constants'
import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import type { NewProduct, Product, RawProduct } from '../interfaces/product'
import Swal from 'sweetalert2'

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
          // alert('Hubo un error interno al actualizar el producto. Intente más tarde')
          Swal.fire({
            icon: "error",
            title: "Lo sentimos...",
            text: "Hubo un error interno al actualizar el producto. Intente más tarde"
          });
        },
        next() {
          // alert('Producto actualizado correctamente')
          Swal.fire({
            icon: "success",
            title: "Success",
            text: 'Producto actualizado correctamente'
          });
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
            icon: "error",
            title: "Lo sentimos...",
            text: "Hubo un error interno al eliminar el producto. Intente más tarde"
          });
        },
        next() {
          // alert('Producto eliminado correctamente')
          Swal.fire({
            icon: "success",
            title: "Success",
            text: 'Producto eliminado correctamente'
          });
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

  postProduct( newProduct: NewProduct ) {
    this.httpClient.post(`${baseEndpointUrl}/products/add`, newProduct ).subscribe({
      next: () => {
        JSON.stringify({newProduct})
        // alert('Producto agregado!')
        Swal.fire({
          icon: "success",
          title: "Success",
          text: 'Producto agregado correctamente'
        });
        this.router.navigate(['home/get-products'])
      },
      error: () => {
        // alert('ERROR: No se ha podido cargar el producto')
        Swal.fire({
          icon: "error",
          title: "Lo sentimos...",
          text: "Hubo un error interno al cargar el producto. Intente más tarde"
        });
      }
    })

    //espero que esto sea valido y funcione 
    const opa : Product = {} as Product
    opa.title = newProduct.title
    opa.description = newProduct.description
    opa.price = newProduct.price.toString()
    opa.stock = newProduct.stock.toString()
    opa.thumbnail = newProduct.thumbnail
    this.products.push(opa)
  }
}
