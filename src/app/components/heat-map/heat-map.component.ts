import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexDataLabels
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
  plotOptions: any;
  noData: any;
}

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './heat-map.component.html',
  styleUrl: './heat-map.component.scss'
})
export class HeatMapComponent {

  @ViewChild("chart") chart!: ChartComponent;

  private _data: any[] = [];
  private _title: string = '';

  @Input()
  get data(): any[] {
    return this._data;
  }

  set data(value: any[]) {
    if (value.length > 0) {
      this._data = value;
      this.updateSerie();
    }
  }

  @Input()
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    if (value.length > 0) {
      this._title = value;
      this.chartOptions.title = {
        text: this.title
      }
    }
  }

  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      height: 350,
      type: "heatmap"
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#238636"],
    title: {
      text: this.title,
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
      }
    }
  };

  private updateSerie() {
    this.chartOptions.series = [
      {
        name: "Sunday",
        data: this.data[0]
      },
      {
        name: "Monday",
        data: this.data[1]
      },
      {
        name: "Tuesday",
        data: this.data[2]
      },
      {
        name: "Wednesday",
        data: this.data[3]
      },
      {
        name: "Thursday",
        data: this.data[4]
      },
      {
        name: "Friday",
        data: this.data[5]
      },
      {
        name: "Saturday",
        data: this.data[6]
      },
    ].reverse();
  }
}
