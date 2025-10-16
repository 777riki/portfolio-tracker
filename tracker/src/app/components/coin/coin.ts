import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coins } from '../../services/coins';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-coin',
  standalone: true,
  templateUrl: './coin.html',
  styleUrls: ['./coin.css']
})
export class Coin implements OnInit {

  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;

  route = inject(ActivatedRoute);
  coinService = inject(Coins);
  chart!: Chart;
  coinName: string | null = null;

  ngOnInit() {
    this.coinName = this.route.snapshot.paramMap.get('nameid');
    console.log('Coin ID:', this.coinName);

    if (!this.coinName) return;

    this.coinService.getFullGraph(this.coinName)
      .subscribe(data => {

        // Formattazione leggibile per grafico settimanale
        const timestamps = data.prices.map(p => {
          const d = new Date(p[0]);
          return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:00`;
        });
        const prices = data.prices.map(p => p[1]);

        const ctx = this.chartRef.nativeElement.getContext('2d');
        if (!ctx) return;

        if (this.chart) this.chart.destroy();

        const config: ChartConfiguration = {
          type: 'line',
          data: {
            labels: timestamps,
            datasets: [{
              label: `Price of ${this.coinName?.toUpperCase()} (USD)`,
              data: prices,
              borderColor: '#007bff',
              borderWidth: 2,
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              pointRadius: 0,
              fill: true,
              tension: 0.3,
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
                  font: { size: 11 },
                  maxRotation: 0,
                  minRotation: 0
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
        };

        this.chart = new Chart(ctx, config);
      });
  }
}
