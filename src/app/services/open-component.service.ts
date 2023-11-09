import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenComponentService {

  constructor() { }
  private abrirComponente = new BehaviorSubject<boolean>(false);
  abrirComponente$ = this.abrirComponente.asObservable();

  abrirOcultaComponente(abrir: boolean) {
    this.abrirComponente.next(abrir);
  }
}