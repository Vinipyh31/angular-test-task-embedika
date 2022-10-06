import { IShip } from './types/index';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(ships: IShip[], ...args: unknown[]): unknown {
    return null;
  }

}
