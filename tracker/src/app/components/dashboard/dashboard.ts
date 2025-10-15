import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Coins } from '../../services/coins';
import { Coin } from '../../interfaces/data';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
        this.coins.set(data.data.slice(0, 30));
        console.log(this.coins());

        setTimeout(() => {
          this.coins().forEach((coin, i) => {
            const ctx = document.getElementById(`myChart-${i}`) as HTMLCanvasElement;

            const price_now = parseFloat(coin.price_usd);
            const percent_7d = parseFloat(coin.percent_change_7d);
            const percent_24h = parseFloat(coin.percent_change_24h);
            const percent_1h = parseFloat(coin.percent_change_1h);

            const price_7d_ago = price_now / (1 + percent_7d / 100);
            const price_24h_ago = price_now / (1 + percent_24h / 100);
            const price_1h_ago = price_now / (1 + percent_1h / 100);

            if (ctx) {
              new Chart(ctx, {
                type: 'line',
                data: {
                  labels: ['7d', '24h', '1h', 'Now'],
                  datasets: [{
                    label: `Price of ${coin.name} (USD)`,
                    data: [
                      price_7d_ago,
                      price_24h_ago,
                      price_1h_ago,
                      price_now
                    ],
                    borderWidth: 1,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    tension: 0.3
                  }]
                }
              });
            }
          });
        });
      });
  }

}
