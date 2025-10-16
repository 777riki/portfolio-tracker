import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data';
import { Prices } from '../interfaces/prices';

@Injectable({
  providedIn: 'root'
})
export class Coins {

  http: HttpClient = inject(HttpClient);

  getTrendingCoins(): Observable<Data> {
    return this.http.get<Data>('https://api.coinlore.net/api/tickers/');
  }

  getFullGraph(nameid: string): Observable<Prices> {
    return this.http.get<Prices>(`https://api.coingecko.com/api/v3/coins/${nameid}/market_chart?vs_currency=usd&days=7`)
  }
  
}
