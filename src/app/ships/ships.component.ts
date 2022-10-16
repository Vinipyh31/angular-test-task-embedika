import { Component, OnInit } from '@angular/core';
import { IShip } from '../types';
import { ApiService } from './../api.service';
import { ShipsService } from './../ships.service';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})


export class ShipsComponent implements OnInit {

  type = "";
  page = 1;
  nameInput = "";
  ports: string[] = [];
  totalPages = 0;
  expanded = false;
  ships: IShip[] = [];
  isLoading = true;


  constructor(
    private shipsService: ShipsService,
    private api: ApiService,
  ) {
    shipsService.type.subscribe(value => { this.type = value })
    shipsService.pageNum.subscribe(value => { this.page = value })
    shipsService.nameInput.subscribe(value => { this.nameInput = value })
    shipsService.ports.subscribe(value => { this.ports = value })
    shipsService.ships.subscribe(value => { this.ships = value })
    shipsService.totalPages.subscribe(value => { this.totalPages = value })
  }

  ngOnInit(): void {
    this.api.getShips().subscribe((result: any) => {
      const shipsData = result.data.ships;
      this.shipsService.changeShips(shipsData);
      this.shipsService.changeTotalPages(Math.ceil(shipsData.length / 5))
      this.isLoading = false;
    })
  }

  colorForFirstPage(): string {
    return this.page == 1 ? '#3C474C' : '#2962FF';
  }

  colorForLastPage(): string {
    return this.page == this.totalPages ? '#3C474C' : '#2962FF'
  }

  onInputChange(e: Event) {
    let target = e.target as HTMLInputElement;
    this.shipsService.changeNameInput(target.value);
  }

  onCheckBoxClick(e: Event): void {
    let target = e.target as HTMLInputElement;
    if (this.ports.includes(target.value)) {
      this.shipsService.changePorts(this.ports.filter(port => port !== target.value));
    } else {
      this.shipsService.changePorts([...this.ports, target.value]);
    }
  }

  onRadioClick(e: Event): void {
    let target = e.target as HTMLInputElement;

    if (target.value == this.type) {
      this.shipsService.changeType("");
    } else {
      this.shipsService.changeType((e.target as HTMLInputElement).value);
    }
  }

  showCheckboxes(): void {
    if (!this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }

  incrementPage(): void {
    if (this.page < this.totalPages) {
      this.shipsService.changePageNum(++this.page);
    }
  }

  decrementPage(): void {
    if (this.page > 1) {
      this.shipsService.changePageNum(--this.page)
    }
  }

}
