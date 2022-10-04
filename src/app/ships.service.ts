import { IShip } from './types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  url = 'https://api.spacex.land/graphql';

  constructor() { }

  getShipById(shipId: string, ship: IShip) {
    fetch(this.url, {
      method: 'POST',

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        query: `
        query {
          ship(id: "${shipId}") {
            name
            type
            home_port
            year_built
            weight_kg
            missions {
              name
            }
          }
        }`
      })
    })
      .then(res => res.json())
      .then(res => { ship = res.data })
  }

  getShips(
    type: string,
    name: string,
    homePort: string,
    pageNumber: number,
    ships: IShip[],
    isLoading: boolean,
  ) {
    const offset = (pageNumber - 1) * 3;
    fetch(this.url, {
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
        ships = res.data; 
        console.log(ships);
        isLoading = false;
       })
  }

}
