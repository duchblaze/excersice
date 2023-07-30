import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productName = '';
  products = ['Television', 'Laptops', 'Printers']
  isDisabled = false;
  constructor(private builder: FormBuilder) {
    setInterval(() => {
      this.isDisabled = true;
    }, 3000)
  }

  productForm = this.builder.group({
    productField: this.builder.control('', Validators.required)
  })

  addProduct(form: any) {
    if (form.valid) {
      this.products.push(form.value.productName)
    }
    console.log(form)
  }
  // addProduct() {
  //   this.products.push(this.productName)
  //   this.productName = '';
  // }
}
