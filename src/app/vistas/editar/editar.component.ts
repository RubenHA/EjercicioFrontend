import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { productI } from 'src/app/models/product.interface'
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { ResponseI } from 'src/app/models/response.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alertas: AlertasService
  ) { }

  datosProduct: productI
  editProduct = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    brand: new FormControl(''),
    slug: new FormControl(''),
    status: new FormControl(''),
  })
  productId: any
  ngOnInit(): void {
    this.productId = this.activeRouter.snapshot.paramMap.get('id')

    this.api.getSingleProduct(this.productId).subscribe(
      data => {
        this.datosProduct = data
        this.editProduct.setValue({
          'name': this.datosProduct.name,
          'category': this.datosProduct.category,
          'brand': this.datosProduct.brand,
          'slug': this.datosProduct.slug,
          'status': this.datosProduct.status
        })
      }
    )
  }

  postForm(form:productI){
    this.api.putProduct(form,this.productId).subscribe(
      data =>{
        let respuesta: ResponseI = data
        if(respuesta.status == "ok"){
          this.alertas.showSuccess("Product updated successfully", "UPDATE")
        }else{
          this.alertas.showError(respuesta.result.error.msg, "ERROR")
        }
      }
    )
  }

  deleteProduct(){
    let p:productI = this.editProduct.value
    this.api.deleteProduct(this.productId).subscribe(
      data => {
        let respuesta: ResponseI = data
        if(respuesta.status == "ok"){
          this.alertas.showSuccess("Product removed successfully", "DELETE")
          this.router.navigate(['listado'])
        }else{
          this.alertas.showError(respuesta.result.error.msg, "ERROR")
        }
      }
    )
  }

  regresar(){
    this.router.navigate(['listado'])
  }
}
