import { ShipsService } from './../ships.service';
import { Component, OnInit } from '@angular/core';
import { IShip } from '../types';
import { BehaviorSubject, Observable, take } from 'rxjs';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})


export class ShipsComponent implements OnInit {

  math = Math; //Просто не знал как использовать Math в html;

  type = "";
  page = 1;
  nameInput = "";
  ports: string[] = [];

  filteredShipList: IShip[] = [];

  expanded = false;
  ships: IShip[] = [];
  shipsOnPage: IShip[] = [];
  isLoading = true;


  constructor(public shipsService: ShipsService) {
    shipsService.type.subscribe(value => { this.type = value })
    shipsService.pageNum.subscribe(value => { this.page = value })
    shipsService.nameInput.subscribe(value => { this.nameInput = value })
    shipsService.ports.subscribe(value => { this.ports = value })
  }

  ngOnInit(): void {
    this.getShips()
  }


  renderShipsOnPage() {
    const startPosition = (this.page - 1) * 5;
    this.shipsOnPage = this.filteredShipList.slice(startPosition, startPosition + 5);
  }

  filterList() {

    this.filteredShipList = this.ships
      .filter(ship => this.nameInput == "" ? true : ship.name.toLowerCase().includes(this.nameInput.toLowerCase()))
      .filter(ship => this.ports.length == 0 ? true : this.ports.includes(ship.home_port))
      .filter(ship => this.type == "" ? true : ship.type == this.type);

    this.renderShipsOnPage();
  }

  onInputChange(e: Event) {
    let target = e.target as HTMLInputElement;
    this.shipsService.changeNameInput(target.value);

    this.filterList();
  }

  getShips() {
    const offset = (this.page - 1) * 3;
    fetch(this.shipsService.url, {
      method: 'POST',

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        query: `
        query {
          ships {
                weight_kg
                type
                name
                home_port
                id
            }
        }
        `
      })
    })
      .then(res => res.json())
      .then(res => {
        this.ships = res.data.ships;
        this.filteredShipList = this.ships;
        const startPosition = (this.page - 1) * 5;
        this.shipsOnPage = this.filteredShipList.slice(startPosition, startPosition + 5);
        this.isLoading = false;
      })
  }

  onCheckBoxClick(e: Event): void {
    let target = e.target as HTMLInputElement;
    if (this.ports.includes(target.value)) {
      this.shipsService.changePorts(this.ports.filter(port => port !== target.value));
    } else {
      this.shipsService.changePorts([...this.ports, target.value]);
    }
    this.filterList();
  }


  onRadioClick(e: Event): void {
    let target = e.target as HTMLInputElement;
    console.log(this.ships);

    if (target.value == this.type) {
      this.shipsService.changeType("");
    } else {
      this.shipsService.changeType((e.target as HTMLInputElement).value);
    }
    this.filterList();
  }

  showCheckboxes(): void {
    if (!this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }

  incrementPage(): void {
    const totalPages = Math.ceil(this.filteredShipList.length / 5)
    if (this.page < totalPages) {
      this.shipsService.changePageNum(++this.page);
      this.renderShipsOnPage();
    }
  }

  decrementPage(): void {
    if (this.page > 1) {
      this.shipsService.changePageNum(--this.page)
      this.renderShipsOnPage();
    }
  }

}
