import { ResolveFn } from '@angular/router';
import { CategoriesService } from '../services/categoriesService/categories-service';
import { inject } from '@angular/core';
import { Icategories } from '../interfaces/iccategories/icategories';
import { catchError, map, of } from 'rxjs';

export const detailsCategoryResolver: ResolveFn<Icategories | null> = (route, state) => {

   const _CategoriesService = inject(CategoriesService);
     const id = route.paramMap.get('id');

       if (!id) return of(null);

 return _CategoriesService.getSpecificCAtegory(id).pipe(
  map(res => res.data),  // جايز res فيه data، نحوله للـ Iproduct مباشرة
  catchError(err => {
    console.error('Error loading category:', err);
    return of(null);
    })
  );
};
