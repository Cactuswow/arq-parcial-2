import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ProductService } from '../../services/product.service'
import { NewProduct } from '../../interfaces/product'

@Component({
  selector: 'app-post-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-products.component.html',
  styleUrl: './post-products.component.css'
})
export class PostProductsComponent {
  private formBuilder = inject(FormBuilder)
  private postService = inject(ProductService)


  private newProduct: NewProduct = {} as NewProduct

  private form = this.formBuilder.group({
    nameProduct: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    thumbnail: ['', Validators.required]
  })

  formSubmit() {
    if (this.form.invalid) {
      return
    }
    
    this.newProduct = {
      title: this.getTitle?.value ?? this.newProduct.title,
      description: this.getDescription?.value ?? this.newProduct.description,
      price: Number(this.getPrice?.value)?? this.newProduct.price,
      stock: Number(this.getStock?.value) ?? this.newProduct.stock,
      thumbnail: this.getThumbnail?.value ?? this.newProduct.thumbnail
    }

    this.postService.postProduct(this.newProduct)
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
  get getStock() {
    return this.getForm.get('stock')
  }
  get getThumbnail() {
    return this.getForm.get('thumbnail')
  }
}
