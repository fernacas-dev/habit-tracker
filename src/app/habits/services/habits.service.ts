import { inject, Injectable } from '@angular/core';
import { AppwriteApi } from '../../lib/appwrite/appwrite';
import { Habit } from '../models/habit.model';
import { ID, Query } from 'appwrite';
import { from, map, Observable, ReplaySubject, share, switchMap, take, tap } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  private readonly appwriteAPI = inject(AppwriteApi);

  generateData(count: number, yrange: any, dayOfWeek: string, dates: string[]) {
    const res = this.getDayAndWeekInfo(dates);
    let series: any[] = [];
    let i = 1;
    while (i < count) {
      const x = "week " + (i).toString();
      const item = res.filter(r => r.weekNumber === i && r.dayOfWeek === dayOfWeek);

      if (item.length > 0) {
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

  _items$ = new ReplaySubject<string>();

  items$ = this._items$.pipe(
    switchMap((userId) => this.getItems(userId)),
  );

  _creatingHabit$ = new ReplaySubject<Habit>();

  creatingHabit$ = this._creatingHabit$.pipe(
    switchMap((habit) => this.addHabit(habit))
  );

  _updatingDate$ = new ReplaySubject<{ id: string, date: Date, userId: string }>();

  updatingDate$ = this._updatingDate$.pipe(
    switchMap((data) => this.updateDate(data.id, data.date, data.userId))
  );

  _removingDate$ = new ReplaySubject<{ id: string, date: Date, userId: string }>();

  removingDate$ = this._removingDate$.pipe(
    switchMap((data) => this.removeDate(data.id, data.date, data.userId))
  );

  _deletingHabit$ = new ReplaySubject<{ id: string, userId: string }>();

  deletingHabit$ = this._deletingHabit$.pipe(
    switchMap((habit) => this.removeHabit(habit.id, habit.userId)),
  );

  getItems(userId: string): Observable<any> {
    return from(this.appwriteAPI.database.listDocuments('habitsdb', 'habits', [
      Query.equal('user_id', [userId]),
    ]))
      .pipe(
        map(data => data.documents.map((item: any) => {
          return {
            ...item,
            dates: [
              this.generateData(53, { min: 0, max: 1 }, 'sunday', item.dates),
              this.generateData(53, { min: 0, max: 1 }, 'monday', item.dates),
              this.generateData(53, { min: 0, max: 1 }, 'tuesday', item.dates),
              this.generateData(53, { min: 0, max: 1 }, 'wednesday', item.dates),
              this.generateData(53, { min: 0, max: 1 }, 'thursday', item.dates),
              this.generateData(53, { min: 0, max: 1 }, 'friday', item.dates),
              this.generateData(53, { min: 0, max: 1 }, 'saturday', item.dates),
            ],
            defaultDates: item.dates
          }
        }),
        ));
  }

  updateDate(id: string, date: Date, userId: string) {
    return from(this.appwriteAPI.database.getDocument('habitsdb', 'habits', id)).pipe(
      map((item: any) => {
        item.dates.push(moment(date).format('DD/MM/YYYY'));
        return {
          $id: item.$id,
          name: item.name,
          dates: item.dates,
          user_id: item.user_id,
          description: item.description,
        } as Habit
      }),
      switchMap((habit) => this.appwriteAPI.database.updateDocument('habitsdb', 'habits', id, habit)),
      switchMap(async () => this._items$.next(userId)),
    )
  }

  removeDate(id: string, date: Date, userId: string) {
    return from(this.appwriteAPI.database.getDocument('habitsdb', 'habits', id)).pipe(
      map((item: any) => {
        item.dates = item.dates.filter((d: string) => d !== moment(date).format('DD/MM/YYYY'));
        return {
          $id: item.$id,
          name: item.name,
          dates: item.dates,
          user_id: item.user_id,
          description: item.description,
        } as Habit
      }),
      switchMap((habit) => this.appwriteAPI.database.updateDocument('habitsdb', 'habits', id, habit)),
      switchMap(async () => this._items$.next(userId)),
    )
  }

  addHabit(habit: Habit) {
    return from(this.appwriteAPI.database.createDocument('habitsdb', 'habits', ID.unique(), habit))
      .pipe(
        switchMap(async () => this._items$.next(habit.user_id))
      );
  }

  removeHabit(id: string, userId: string) {
    return from(this.appwriteAPI.database.deleteDocument('habitsdb', 'habits', id))
      .pipe(
        switchMap(async () => this._items$.next(userId))
      );
  }
}
