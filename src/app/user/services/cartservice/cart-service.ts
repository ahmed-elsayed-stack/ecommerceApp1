import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _HttpClient = inject(HttpClient);

  numOfCart:WritableSignal<number> = signal(0);

  addProductToCart(id:string | null):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` ,
      {
        "productId" : id
      }
    );

  }

    getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  Updatecartproductquantity(id:string , numCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}` ,
      {
         "count": numCount
      }
    )
  }

   RemovespecificcartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }

  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

}


