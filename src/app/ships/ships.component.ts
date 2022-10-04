import { ShipsService } from './../ships.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})


export class ShipsComponent implements OnInit {

  type = "";
  expanded = false;
  ports: String[] = [];
  ships = [];
  page = 0;


  constructor(private client: ShipsService ) {
  }

  ngOnInit(): void {

  }

  onCheckBoxClick(e: Event): void {
    let target = e.target as HTMLInputElement;
    if (this.ports.includes(target.value)) {
      this.ports = this.ports.filter(port => port !== target.value);
    } else {
      this.ports = [...this.ports, target.value];
    }
  }


  onRadioClick(e: Event): void {
    let target = e.target as HTMLInputElement;
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
