import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { ToggleComponent } from '@lib/ui/toggle/toggle.component';
import { HeatMapComponent } from '@lib/ui/heat-map/heat-map.component';

@Component({
  selector: 'app-habit-item',
  standalone: true,
  imports: [ToggleComponent, HeatMapComponent, CommonModule, FontAwesomeModule],
  template: `
    <li class="my-8">
      <a
        class="block max-w pr-6 pl-2 py-2 pb-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-">
        <button class="rounded-full bg-red-500 px-2" (click)="removeHabitClicked(itemHeatmap.$id)">X</button>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{{itemHeatmap.name}}
        </h5>
        <span class="float-left p-3 rounded-md text-white text-md bg-gray-800 cursor-pointer" (click)="showHeatmap()">
          <fa-icon [icon]="faArrowUp"></fa-icon>
        </span>
        <app-toggle class="float-right z-0" (valueChanged)="updateToggle($event)" [state]="state"></app-toggle>
      </a>

      @if(open){
        <div class="p-12 m-auto bg-gray-100 rounded-b-lg" *ngIf="open">
          <app-heat-map [data]="itemHeatmap" [name]="itemHeatmap.name"></app-heat-map>
        </div>
      }
    </li>
  `,
})
export class HabitItemComponent implements OnInit {
  @Input() itemHeatmap: any;
  @Output() toggleUpdated = new EventEmitter<{ id: string, date: Date, event: boolean }>();
  @Output() removeHabit = new EventEmitter<string>();

  open: boolean = false;
  state: boolean = false;

  faArrowUp = this.open ? faArrowUp : faArrowDown;

  showHeatmap() {
    this.open = !this.open;
    this.faArrowUp = this.open ? faArrowUp : faArrowDown;
  }

  updateToggle(event: any) {
    this.toggleUpdated.emit({ id: this.itemHeatmap.$id, date: new Date(), event });
  }

  removeHabitClicked(id: string) {
    this.removeHabit.emit(id);
  }

  ngOnInit(): void {
    if (this.itemHeatmap !== null) {
      const it = this.itemHeatmap.defaultDates.filter((date: string) => date === moment().format('DD/MM/YYYY'));
      if (it.length > 0) {
        this.state = true;
      }
    }
  }
}
