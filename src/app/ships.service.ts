import { IShip } from './types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  url = 'https://api.spacex.land/graphql';

  pageNum: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageNum$: Observable<number> = this.pageNum.asObservable();
  
  nameInput: BehaviorSubject<string> = new BehaviorSubject<string>('');
  nameInput$: Observable<string> = this.nameInput.asObservable();
  
  ports: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  ports$: Observable<string[]> = this.ports.asObservable();
  
  type: BehaviorSubject<string> = new BehaviorSubject<string>('');
  type$: Observable<string> = this.type.asObservable();

  
  constructor() { }

  changePageNum(num: number){
    this.pageNum$.pipe(take(1)).subscribe(() => {
      this.pageNum.next(num);
    })
  }
  changeNameInput(str: string){
    this.nameInput$.pipe(take(1)).subscribe(() => {
      this.nameInput.next(str);
    })
  }
  changePorts(ports: string[]){
    this.ports$.pipe(take(1)).subscribe(() => {
      this.ports.next(ports);
    })
  }
  changeType(str: string){
    this.type$.pipe(take(1)).subscribe(() => {
      this.type.next(str);
    })
  }


  getShipById(shipId: string, ship: IShip) {
    fetch(this.url, {
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
      .then(res => { ship = res.data })
  }

  getShips(
    type: string,
    name: string,
    homePort: string,
    pageNumber: number,
    ships: IShip[],
    isLoading: boolean,
  ) {
    const offset = (pageNumber - 1) * 3;
    fetch(this.url, {
      method: 'POST',

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        query: `
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
      })
    })
      .then(res => res.json())
      .then(res => { 
        ships = res.data; 
        console.log(ships);
        isLoading = false;
       })
  }

}
