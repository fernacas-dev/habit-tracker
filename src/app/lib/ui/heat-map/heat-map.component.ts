import { Component, Input, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexDataLabels,
  ApexResponsive
} from "ng-apexcharts";
import { HabitHeatmap } from '../../../habits/models/habit.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
  plotOptions: any;
  noData: any;
  responsive: ApexResponsive[];
}

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <div id="chart">
      <apx-chart [series]="chartOptions.series!" [chart]="chartOptions.chart!" [dataLabels]="chartOptions.dataLabels!"
        [title]="chartOptions.title!" [colors]="chartOptions.colors" [plotOptions]="chartOptions.plotOptions"
        [noData]="chartOptions.noData" [responsive]="chartOptions.responsive!"></apx-chart>
    </div>
  `
})
export class HeatMapComponent {

  @ViewChild("chart") chart!: ChartComponent;

  private _data!: HabitHeatmap;
  private _name!: string;

  @Input()
  get data(): HabitHeatmap {
    return this._data;
  }

  set data(value: HabitHeatmap) {
    if (value !== null) {
      this._data = value;
      this.updateSerie();
    }
  }

  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value !== null) {
      this._name = value;
      this.updateSerie();
    }
  }

  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      type: 'heatmap',
      height: 300,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#238636"],
    title: {
      text: this.name,
    },
    noData: {
      text: undefined,
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: 'black',
        fontSize: '14px',
        fontFamily: undefined
      }
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: '100%',
            height: '100%'
          },
          plotOptions: {
            heatmap: {
              radius: 0
            }
          }
        }
      }
    ],
    plotOptions: {
      heatmap: {
        radius: 5,
        distributed: true,
        colorScale: {
          ranges: [{
            from: 0,
            to: 0,
            color: 'gray',
            name: "Itn't done",
          },
          {
            from: 1,
            color: '#238636',
            name: 'Done',
          }
          ]
        }
        ,
      }
    }
  };

  private updateSerie() {
    this.chartOptions.series = [
      {
        name: "Sunday",
        data: this.data!.dates[0]
      },
      {
        name: "Monday",
        data: this.data!.dates[1]
      },
      {
        name: "Tuesday",
        data: this.data!.dates[2]
      },
      {
        name: "Wednesday",
        data: this.data!.dates[3]
      },
      {
        name: "Thursday",
        data: this.data!.dates[4]
      },
      {
        name: "Friday",
        data: this.data!.dates[5]
      },
      {
        name: "Saturday",
        data: this.data!.dates[6]
      },
    ].reverse();
  }
}
