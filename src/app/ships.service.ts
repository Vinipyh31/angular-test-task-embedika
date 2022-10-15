import { IShip } from './types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  ships: BehaviorSubject<IShip[]> = new BehaviorSubject<IShip[]>([]);
  ships$: Observable<IShip[]> = this.ships.asObservable();

  pageNum: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageNum$: Observable<number> = this.pageNum.asObservable();

  nameInput: BehaviorSubject<string> = new BehaviorSubject<string>('');
  nameInput$: Observable<string> = this.nameInput.asObservable();

  ports: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  ports$: Observable<string[]> = this.ports.asObservable();

  type: BehaviorSubject<string> = new BehaviorSubject<string>('');
  type$: Observable<string> = this.type.asObservable();

  totalPages: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPages$: Observable<number> = this.totalPages.asObservable();


  constructor() { }

  changeTotalPages(totalPages: number) {
    this.totalPages$.pipe(take(1)).subscribe(() => {
      this.totalPages.next(totalPages);
    }).unsubscribe();
  }

  changeShips(ships: IShip[]) {
    this.ships$.pipe(take(1)).subscribe(() => {
      this.ships.next(ships);
    }).unsubscribe();
  }

  changePageNum(num: number) {
    this.pageNum$.pipe(take(1)).subscribe(() => {
      this.pageNum.next(num);
    }).unsubscribe();
  }

  changeNameInput(str: string) {
    this.nameInput$.pipe(take(1)).subscribe(() => {
      this.nameInput.next(str);
    }).unsubscribe();
  }
  changePorts(ports: string[]) {
    this.ports$.pipe(take(1)).subscribe(() => {
      this.ports.next(ports);
    }).unsubscribe();
  }
  changeType(str: string) {
    this.type$.pipe(take(1)).subscribe(() => {
      this.type.next(str);
    }).unsubscribe();
  }
}
