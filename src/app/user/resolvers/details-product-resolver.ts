import { ResolveFn } from '@angular/router';
import { Iproduct } from '../interfaces/iproduct';
import { Productservice } from '../services/productsrvice/productservice';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const detailsProductResolver: ResolveFn<Iproduct | null> = (route, state) => {

   const _Productservice = inject(Productservice);
     const id = route.paramMap.get('id');

       if (!id) return of(null);

 return _Productservice.getSpesificProduct(id).pipe(
  map(res => res.data),  // جايز res فيه data، نحوله للـ Iproduct مباشرة
  catchError(err => {
    console.error('Error loading product:', err);
    return of(null);
    })
  );
};
