import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})


export class ShipsComponent implements OnInit {

  type = "";


  constructor() {
  }

  ngOnInit(): void {
  }

  onRadioChange(e : Event): void {
    let target = e.target as HTMLInputElement;
    if (target.value == this.type) {
      target.checked = false;
      this.type = "";
    } else {
      target.checked = true;
      this.type = (e.target as HTMLInputElement).value;
    }
  }

  

}
