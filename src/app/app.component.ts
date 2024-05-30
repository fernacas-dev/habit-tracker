import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { HabitListComponent } from './components/habit-list/habit-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeatMapComponent, ToggleComponent, HabitListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
