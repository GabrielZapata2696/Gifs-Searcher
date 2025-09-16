import {  AfterViewInit, Component, computed, ElementRef, inject, viewChild } from '@angular/core';

import { GifService } from '../../services/gif.service';
import { ScrollStateService } from '../../services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',

})
export default class TrendingPageComponent implements AfterViewInit{

  public gifsService = inject(GifService);
  public scrollStateService = inject(ScrollStateService);

  public gifs = computed(() => this.gifsService.trendingGifs());

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');


  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(value: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const {scrollTop, scrollHeight, clientHeight} = scrollDiv; //propiedades del scroll

    const estaAlFinal = scrollTop + clientHeight >= scrollHeight - 300;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(estaAlFinal){
      this.gifsService.loadTrendingGifs();
    }
  }


 }
