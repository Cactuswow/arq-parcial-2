import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import type { Product } from '../../interfaces/product'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-get-product',
  standalone: true,
  imports: [],
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.css'
})
export class GetProductComponent {
  private productService = inject(ProductService)
  private route = inject(ActivatedRoute)
  productNow: Product | undefined
  rutaSegmentos: string[] = []

  ngOnInit(): void {
    // Acceder a los segmentos de la ruta activa
    this.route.url.subscribe(segments => {
      this.rutaSegmentos = segments.map(segment => segment.path)
    })
  }
  get getProducts() {
    return this.productService.getProducts
  }
  getParam() {
    return this.rutaSegmentos[1]
  }

  getProduct() {
    const product = this.getProducts.find(
      product => product.id == this.getParam()
    )
    this.productNow = product
    return product
  }
}
