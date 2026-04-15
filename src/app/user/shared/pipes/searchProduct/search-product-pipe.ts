import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../../interfaces/iproduct';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

    transform(arrayOfObject:Iproduct[] , klma:string ): Iproduct[] {

    return arrayOfObject.filter( (item)=>  item.title.toLowerCase().includes(klma.toLowerCase()) );
  }

}
