import { ShipsService } from './../ships.service';
import { Component, OnInit } from '@angular/core';
import { IShip } from '../types';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})


export class ShipsComponent implements OnInit {

  type = "";
  expanded = false;
  ports: String[] = [];
  ships: IShip[] = [];
  shipsOnPage: IShip[] = [];
  page = 0;
  nameInput = "";
  isLoading = true;


  constructor(public shipsService: ShipsService) {
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
        this.shipsOnPage = this.ships.slice(this.page, this.page + 5)
      })
  }

  onCheckBoxClick(e: Event): void {
    let target = e.target as HTMLInputElement;
    if (this.ports.includes(target.value)) {
      this.ports = this.ports.filter(port => port !== target.value);
    } else {
      this.ports = [...this.ports, target.value];
    }
    this.ships = this.ships.filter((ship: IShip) => this.ports.includes(ship.type))
  }


  onRadioClick(e: Event): void {
    let target = e.target as HTMLInputElement;
    console.log(this.ships);

    if (target.value == this.type) {
      target.checked = false;
      this.type = "";
    } else {
      target.checked = true;
      this.type = (e.target as HTMLInputElement).value;
    }
  }

  showCheckboxes(): void {
    if (!this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }



}
