import { ApiService } from './../api.service';
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
    private _location: Location,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getShipById(this.route.snapshot.params['id']).subscribe((result: any) => {
      this.ship = result.data.ship;
      this.isLoading = false;
      this.missions = this.ship.missions.map(m => m.name);
    })
  }

  backClicked() {
    this._location.back();
  }
}
