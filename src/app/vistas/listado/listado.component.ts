import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Router } from '@angular/router'; 
import { productI } from 'src/app/models/product.interface'

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  products: productI[];
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.api.getAllProducts().subscribe(
      data => this.products = data
    )
  }

  editProduct(id){
    this.router.navigate(['editar', id])
  }

  newProduct(){
    this.router.navigate(['nuevo'])
  }
}
