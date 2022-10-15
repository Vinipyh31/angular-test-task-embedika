import { IShip } from './../types/index';
import { Pipe, PipeTransform } from '@angular/core';
import { ShipsService } from '../ships.service';
import { ShipsComponent } from './ships.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private shipsService: ShipsService) { }

  transform(ships: IShip[], page: number, nameInput: string, ports: string[], type: string) {
    const filteredShips = ships
      .filter(ship => nameInput == "" ? true : ship.name.toLowerCase().includes(nameInput.toLowerCase()))
      .filter(ship => ports.length == 0 ? true : ports.includes(ship.home_port))
      .filter(ship => type == "" ? true : ship.type == type);


    const totalPages = Math.ceil(filteredShips.length / 5);
    this.shipsService.changeTotalPages(totalPages)

    if (totalPages < page) {
      this.shipsService.changePageNum(1);
      page = 1
    }

    const startPosition = (page - 1) * 5;
    const result = filteredShips.slice(startPosition, startPosition + 5);

    return result;
  }

}
