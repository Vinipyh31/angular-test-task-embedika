import { ShipsService } from './../ships.service';
import { Component, OnInit } from '@angular/core';
import { IShip } from '../types';
import { take } from 'rxjs';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})


export class ShipsComponent implements OnInit {

  type = "";
  page = 0;
  nameInput = "";
  ports: string[] = [];

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
        this.ships = this.ships
        // .filter((ship: IShip) => this.nameInput.includes(ship.name))
        // .filter((ship: IShip) =>  true)//this.ports.includes(ship.type))
        // .filter((ship: IShip) =>  true)//ship.type == this.type)
        console.log(this.ships);
        this.isLoading = false;
        const startPosition = (this.page - 1) * 5;
        this.shipsOnPage = this.ships.slice(startPosition, startPosition + 5);
      })
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
    console.log(this.ships);

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
    const totalPages = Math.ceil(this.ships.length / 5)
    if (this.page < totalPages) {
      this.shipsService.changePageNum(++this.page);
      const startPosition = (this.page - 1) * 5;
      this.shipsOnPage = this.ships.slice(startPosition, startPosition + 5);
    }
  }

  decrementPage(): void {
    if (this.page > 1) {
      this.shipsService.changePageNum(--this.page)
      const startPosition = (this.page - 1) * 5;
      this.shipsOnPage = this.ships.slice(startPosition, startPosition + 5);
    }
  }

}
