import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import type { Product } from '../../interfaces/product'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-update-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-products.component.html',
  styleUrl: './update-products.component.css'
})
export class UpdateProductsComponent {
  private router = inject(Router)
  private productService = inject(ProductService)
  private formBuilder = inject(FormBuilder)

  constructor() {
    const product = this.productService.getProducts.find(
      product => product.id === this.router.url.split('/')[3]
    )

    if (product === undefined) {
      this.router.navigate(['**'])
      return
    }

    this.product = product
    this.form = this.formBuilder.group({
      title: [this.product.title, Validators.required],
      description: [this.product.description, Validators.required],
      price: [this.product.price, Validators.required],
      rating: [this.product.rating, Validators.required],
      thumbnail: [this.product.thumbnail, Validators.required],
      stock: [this.product.stock, Validators.required]
    })
  }

  private product: Product = {} as Product
  private form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    rating: ['', Validators.required],
    thumbnail: ['', Validators.required],
    stock: ['', Validators.required]
  })

  get getProduct() {
    return this.product
  }

  get getForm() {
    return this.form
  }

  get getTitle() {
    return this.getForm.get('title')
  }

  get getDescription() {
    return this.getForm.get('description')
  }

  get getPrice() {
    return this.getForm.get('price')
  }

  get getRating() {
    return this.getForm.get('rating')
  }

  get getThumbnail() {
    return this.getForm.get('thumbnail')
  }

  get getStock() {
    return this.getForm.get('stock')
  }
}
