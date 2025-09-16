import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY = 'history';

const loadFromLocalStorage = () => {
  const history = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(history);
  return gifs as Record<string, Gif[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GifService {

  //inyecciones
  private http = inject(HttpClient);


  //señales
  public trendingGifs = signal<Gif[]>([])
  public trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  public trendingGifGrouped = computed<Gif[][]>(() => {
    //masonry layout
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });


  public searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  public searchHistoryKeys = computed<string[]>(() => Object.keys(this.searchHistory()));


  constructor() {
    this.loadTrendingGifs();
  }

  //efectos
  public saveToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });



  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.trendingPage.update(page => page + 1); //incrementar la página

    //llamada http
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '25',
        rating: 'r',
        offset: ((this.trendingPage() - 1) * 25).toString()
      }
    }).subscribe(response => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);//mapear los datos a Gif[]
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);//añadir los nuevos gifs a los existentes
      this.trendingGifsLoading.set(false);//finalizar carga
    });
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        q: query,
        limit: '25',
        rating: 'r'
      }
    })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap((gifs) => {

          this.searchHistory.update(history => ({
            ...history,
            [query.toLowerCase()]: gifs
          }))
        })
      );
  }

  getHistoryByKey(key: string): Gif[] {
    return this.searchHistory()[key] ?? [];
  }


}
