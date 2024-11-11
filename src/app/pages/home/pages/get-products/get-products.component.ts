import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-get-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './get-products.component.html',
  styleUrl: './get-products.component.css'
})
export class GetProductsComponent {
  private productService = inject(ProductService)

  get getProducts() {
    return this.productService.getProducts
  }
}
