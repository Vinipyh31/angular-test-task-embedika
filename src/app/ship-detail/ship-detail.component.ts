import { ShipsService } from './../ships.service';
import { Component, OnInit } from '@angular/core';
import { IShip } from '../types';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { gql, Apollo } from 'apollo-angular';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.scss']
})

export class ShipDetailComponent implements OnInit {

  ship = {} as IShip;
  isLoading = true;
  missions: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: ShipsService,
    private _location: Location,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.getShipById(this.route.snapshot.params['id']);
  }

  backClicked() {
    this._location.back();
  }

  getShipById(shipId: string) {
    this.apollo
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
      })
      .valueChanges.subscribe((result: any) => {
        this.ship = result.data.ship;
        this.isLoading = false;
        this.missions = this.ship.missions.map(m => m.name);
      })
  }
}
