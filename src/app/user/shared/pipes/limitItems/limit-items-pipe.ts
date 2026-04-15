import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitItems'
})
export class LimitItemsPipe implements PipeTransform {

  transform(value: any[], start: number, end: number): unknown {


    return value.slice(start, end);

  }

}
