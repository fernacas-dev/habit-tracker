import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  dates: string[] = [
    '2024-04-22',
    '2024-04-28',
    '2024-05-28',
  ];

  public generateData(count: number, yrange: any, dayOfWeek: string, dates: string[]) {
    const res = this.getDayAndWeekInfo(dates);
    let series: any[] = [];
    let i = 1;
    while (i < count) {
      const x = "week " + (i).toString();
      const item = res.filter(r => r.weekNumber === i && r.dayOfWeek === dayOfWeek);

      if (item.length > 0) {
        // console.log(item);
        series.push({
          x: x,
          y: 1
        });
      } else {
        series.push({
          x: x,
          y: 0
        });
      }
      i++;
    }
    return series;
  }

  getDayOfWeek(date: Date) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  }

  // Función para obtener el número de la semana del año
  getWeekNumber(date: any) {
    const startDate: any = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startDate.getDay() + 1) / 7);
  }

  // Función principal para obtener la información completa
  getDayAndWeekInfo(dateString: string[]) {
    const res: any[] = [];

    dateString.forEach(d => {
      const date = new Date(d);
      const dayOfWeek = this.getDayOfWeek(date);
      const weekNumber = this.getWeekNumber(date);

      res.push({
        dayOfWeek,
        weekNumber
      });

    });
    return res;
  }


  getItems() {
    return [
      {
        id: 1,
        data: [
          this.generateData(53, { min: 0, max: 1 }, 'sunday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'monday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'tuesday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'wednesday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'thursday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'friday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'saturday', this.dates),
        ],
        title: 'Hacer ejercicio'
      },
      {
        id: 2,
        data: [
          this.generateData(53, { min: 0, max: 1 }, 'sunday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'monday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'tuesday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'wednesday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'thursday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'friday', this.dates),
          this.generateData(53, { min: 0, max: 1 }, 'saturday', this.dates),
        ],
        title: 'Hacer ejercicio'
      },
    ]
  }

  addItem(date: Date) {
    this.dates.push(date.toDateString());
  }

  removeItem(date: Date) {
    delete this.dates[this.dates.indexOf(date.toDateString())];
  }
}
