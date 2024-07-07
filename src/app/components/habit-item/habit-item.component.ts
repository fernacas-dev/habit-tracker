import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { HeatMapComponent } from '../heat-map/heat-map.component';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

@Component({
  selector: 'app-habit-item',
  standalone: true,
  imports: [ToggleComponent, HeatMapComponent, CommonModule, FontAwesomeModule],
  templateUrl: './habit-item.component.html',
  styleUrl: './habit-item.component.scss'
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
      console.log(this.itemHeatmap)
      console.log(moment().format('DD/MM/YYYY'))
      const it = this.itemHeatmap.defaultDates.filter((date: string) => date === moment().format('DD/MM/YYYY'));
      console.log(it)
      if (it.length > 0) {
        console.log('aqui')
        this.state = true;
      }
    }
  }

}
