import { Component, inject } from '@angular/core';
import { HeatMapComponent } from '../heat-map/heat-map.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { HabitListComponent } from '../habit-list/habit-list.component';
import { HabitFormComponent } from '../habit-form/habit-form.component';
import { NgxBottomSheetModalComponent } from 'ngx-bottom-sheet-modal';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [HeatMapComponent, ToggleComponent, HabitListComponent, HabitFormComponent, NgxBottomSheetModalComponent, CommonModule, HeaderComponent],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss'
})
export class HabitsComponent {
  isCreating = false;
  authService = inject(AuthService);
  user$ = this.authService.user$;

  onToggled() {
    this.isCreating = !this.isCreating;
    if (this.isCreating) {
      this.gotoTop();
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


}
