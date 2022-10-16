import { Component, Input, OnInit } from '@angular/core';
import { IShip } from './../types/index';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss']
})
export class ShipItemComponent implements OnInit {

  @Input() ship: IShip | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
