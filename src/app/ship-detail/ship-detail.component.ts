import { ShipsService } from './../ships.service';
import { Component, OnInit } from '@angular/core';
import { IShip } from '../types';
import { ActivatedRoute } from '@angular/router';

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
    private service: ShipsService
  ) { }

  ngOnInit(): void {
    this.getShipById(this.route.snapshot.params['id']);
  }

  getShipById(shipId: string) {
    fetch(this.service.url, {
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
      .then(res => {
        this.ship = res.data.ship; 
        this.isLoading = false; 
        this.missions = this.ship.missions.map(m => m.name);
        console.log(this.ship);
      })
  }


}
