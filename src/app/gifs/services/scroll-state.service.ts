import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  // Estado de scroll para la página de trending usando signals
  public trendingScrollState = signal<number>(0);

  constructor() { }
}
