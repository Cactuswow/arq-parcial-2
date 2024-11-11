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
    if (this.getProducts.length === 0) {
      return
    }

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

  formSubmit() {
    if (this.form.invalid) {
      return
    }

    this.product = {
      id: this.product.id,
      title: this.getTitle?.value ?? this.product.title,
      description: this.getDescription?.value ?? this.product.description,
      price: this.getPrice?.value ?? this.product.price,
      rating: this.getRating?.value ?? this.product.rating,
      thumbnail: this.getThumbnail?.value ?? this.product.thumbnail,
      stock: this.getStock?.value ?? this.product.stock
    }

    this.productService.updateProduct(this.product)
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product)
    this.router.navigate(['home/get-products'])
  }

  get getProduct() {
    return this.product
  }

  get getProducts() {
    return this.productService.getProducts
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
