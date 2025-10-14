import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class Coins {

  http: HttpClient = inject(HttpClient);

  getTrendingCoins(): Observable<Data> {
    return this.http.get<Data>('https://api.coinlore.net/api/tickers/');
  }
  
}
