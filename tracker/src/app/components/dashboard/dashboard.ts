import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Coins } from '../../services/coins';
import { Coin } from '../../interfaces/data';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dashboard implements OnInit {

  coinService: Coins = inject(Coins);
  coins: WritableSignal<Coin[]> = signal<Coin[]>([]);

  ngOnInit(): void {
    this.coinService.getTrendingCoins()
      .subscribe(data => {
        this.coins.set(data.data.slice(0, 15));
        console.log(this.coins());
      });
  }

}
