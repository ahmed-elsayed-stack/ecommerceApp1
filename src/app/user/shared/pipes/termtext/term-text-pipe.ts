import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText'
})
export class TermTextPipe implements PipeTransform {

  transform(text:string , limit:number): unknown {
    return text.split(" " , limit);
  }

}
