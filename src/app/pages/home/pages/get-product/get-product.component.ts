import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Product } from '../../interfaces/product'
import { ProductService } from '../../services/product.service'
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-get-product',
  standalone: true,
  imports: [],
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.css'
})
export class GetProductComponent {
  private productService = inject(ProductService)

  rutaSegmentos: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Acceder a los segmentos de la ruta activa
    this.route.url.subscribe((segments) => {
      this.rutaSegmentos = segments.map((segment) => segment.path);
    });
  }
  get getProducts() {
    return this.productService.getProducts
  }
  getParam(){
    return this.rutaSegmentos[1]
  }
}
