import { Component, OnInit, inject } from '@angular/core';
import { HabitItemComponent } from '../habit-item/habit-item.component';
import { HabitsService } from '../../services/habits.service';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [HabitItemComponent],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.scss'
})
export class HabitListComponent implements OnInit {
  private readonly habitsService = inject(HabitsService);

  items: any[] = [];

  ngOnInit(): void {
    this.items = this.habitsService.getItems();
    console.log(this.items);
  }

  toggleUpdated(event: boolean) {
    console.log(event)
    if (event) {
      this.habitsService.addItem(new Date());
    } else {
      this.habitsService.removeItem(new Date());
    }

    this.items = this.habitsService.getItems();
  }

}
