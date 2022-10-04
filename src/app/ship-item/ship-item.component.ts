import { IShip } from './../types/index';
import { Component, Input, OnInit } from '@angular/core';

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
