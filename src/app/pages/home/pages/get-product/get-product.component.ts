import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
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
}
