import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { HeatMapComponent } from '../heat-map/heat-map.component';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-habit-item',
  standalone: true,
  imports: [ToggleComponent, HeatMapComponent, CommonModule, FontAwesomeModule],
  templateUrl: './habit-item.component.html',
  styleUrl: './habit-item.component.scss'
})
export class HabitItemComponent {
  @Input() item: any;
  @Output() toggleUpdated = new EventEmitter<boolean>();

  open: boolean = false;


  faArrowUp = this.open ? faArrowUp : faArrowDown;

  showHeatmap() {
    this.open = !this.open;
    this.faArrowUp = this.open ? faArrowUp : faArrowDown;
  }

  updateToggle(event: any) {
    // console.log(event);
    this.toggleUpdated.emit(event);
  }
}
