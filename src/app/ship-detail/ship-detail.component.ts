import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IShip } from '../types';
import { ApiService } from './../api.service';
import { ShipsService } from './../ships.service';

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
