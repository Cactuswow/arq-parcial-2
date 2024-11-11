import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ProductService } from '../../services/product.service'

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

    const { nameProduct, description, price, stock, thumbnail } =
      this.form.value
    this.postService.postProduct(
      nameProduct as string,
      description as string,
      price as string,
      stock as string,
      thumbnail as string
    )
  }

  get getForm() {
    return this.form
  }
  get getNameProduct() {
    return this.getForm.get('nameProduct')
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
