import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';




@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  url = 'https://api.spacex.land/graphql';

  constructor(private apollo: Apollo) { }

  getShipById(shipId: string, ship: string) {
    this.apollo
      .watchQuery({
        query: gql`
          ship(id: "${shipId}") {
          name
          type
          home_port
          year_built
          weight_kg
          missions {
            name
            flight
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        ship = result?.data;
      });
  }

  getShips(
    type: string,
    name: string,
    homePort: string,
    pageNumber: number,
    ships: string
  ) {
    const offset = (pageNumber - 1) * 3;
    this.apollo
      .watchQuery({
        query: gql`
          {
            ships(find: {type: "${type}", name: "${name}", home_port: "${homePort}"}, offset: ${offset}) {
              weight_kg
              type
              name
              home_port
              id
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        ships = result?.data;
      });
  }

}
