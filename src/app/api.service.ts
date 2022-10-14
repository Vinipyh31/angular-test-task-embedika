import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  getShips(): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .watchQuery({
        query: gql`
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
      }).valueChanges
  }

  getShipById(shipId: string): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .watchQuery({
        query: gql`
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
        }
        `
      }).valueChanges
    }
  }
