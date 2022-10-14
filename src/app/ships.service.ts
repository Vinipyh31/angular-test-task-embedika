import { IShip } from './types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  pageNum: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageNum$: Observable<number> = this.pageNum.asObservable();

  nameInput: BehaviorSubject<string> = new BehaviorSubject<string>('');
  nameInput$: Observable<string> = this.nameInput.asObservable();

  ports: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  ports$: Observable<string[]> = this.ports.asObservable();

  type: BehaviorSubject<string> = new BehaviorSubject<string>('');
  type$: Observable<string> = this.type.asObservable();


  constructor() { }

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
