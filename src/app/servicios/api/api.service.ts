import { Injectable } from '@angular/core';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productI } from 'src/app/models/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  url:string = 'https://localhost:44300/api/product';

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<productI[]>{
    return this.http.get<productI[]>(this.url);
  }

  getSingleProduct(id):Observable<productI>{
    let direccion = this.url + "/" + id;
    return this.http.get<productI>(direccion)
  }

  postProduct(form: productI): Observable<ResponseI>{
    let options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'MyClientCert': '',        // This is empty
        'MyToken': ''
      }),
      body: form
    }
    console.log(options)
    return this.http.post<ResponseI>(this.url, options)
  }

  putProduct(form: productI, id:string): Observable<ResponseI>{
    let direccion = this.url + "/" + id;
    return this.http.put<ResponseI>(direccion, form)
  }

  deleteProduct(id: any): Observable<ResponseI>{
    let direccion = this.url + "/" + id;
    let options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      body: id
    }
    return this.http.delete<ResponseI>(direccion, options)
  }
}
