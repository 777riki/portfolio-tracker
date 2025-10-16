import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Coins } from '../../services/coins';
import { Coin } from '../../interfaces/data';
import { Chart, registerables } from 'chart.js';
import { RouterLink } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-trending',
  imports: [RouterLink],
  templateUrl: './trending.html',
  styleUrl: './trending.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Trending implements OnInit {

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
                    borderColor: '#007bff',
                    borderWidth: 2,
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true,
                    tension: 0.3
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: {
                        maxTicksLimit: 10,
                        color: '#666',
                        font: { size: 11 }
                      },
                      grid: { display: false }
                    },
                    y: {
                      ticks: {
                        color: '#666',
                        callback: (value: any) => `$${value.toLocaleString()}`
                      },
                      grid: {
                        color: 'rgba(200, 200, 200, 0.2)'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: true,
                      labels: { color: '#333' }
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                      backgroundColor: '#0d6efd',
                      titleColor: '#fff',
                      bodyColor: '#fff'
                    }
                  },
                  interaction: {
                    mode: 'index',
                    intersect: false
                  }
                }
              });
            }

          });
        }, 1);
      });
  }

}
