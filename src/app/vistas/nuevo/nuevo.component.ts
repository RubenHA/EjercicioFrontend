import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { productI } from 'src/app/models/product.interface'
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { ResponseI } from 'src/app/models/response.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alertas: AlertasService
  ) { }

  datosProduct: productI
  newProduct = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    brand: new FormControl(''),
    slug: new FormControl(''),
    status: new FormControl(''),
  })

  ngOnInit(): void {
  }

  postForm(form:productI){
    this.api.postProduct(form).subscribe(
      data =>{
        /* let respuesta: ResponseI = data
        if(respuesta.status == "ok"){
          this.alertas.showSuccess("Product updated successfully", "UPDATE")
        }else{
          this.alertas.showError(respuesta.result.error.msg, "ERROR")
        } */
      }
    )
  }
  
  regresar(){
    this.router.navigate(['listado'])
  }
}
