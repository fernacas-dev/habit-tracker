import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Habit } from '../../models/habit.model';
import { HabitsService } from '../../services/habits.service';
import { map, merge, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './habit-form.component.html',
})
export class HabitFormComponent {

  @Input() userId: string = '';

  formBuilder = inject(FormBuilder);

  habitService = inject(HabitsService);

  form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', [Validators.required]],
  });

  loading$ = merge(
    this.habitService.creatingHabit$.pipe(map(() => false))
  ).pipe(startWith(false));

  onSubmit(): void {
    if (this.form?.valid) {

      const habit: Habit = {
        name: this.form.value.name!,
        description: this.form.value.description!,
        user_id: this.userId,
        dates: [],
      };

      this.habitService._creatingHabit$.next(habit);
      this.habitService._items$.next(this.userId);

      this.form.reset();

    } else {
      console.log('Form is invalid');
    }
  }
}
