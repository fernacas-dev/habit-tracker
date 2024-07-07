import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, merge, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HabitsService } from '@habits/services/habits.service';
import { Habit } from '@habits/models/habit.model';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="my-8">
      @if(loading$|async){
      <div>Loading ...</div>
      }
      <div class="my-8">
        <a
          class="block max-w p-6 py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Add Habit </h5>
        </a>
        <div class="p-12 m-auto bg-gray-100 rounded-b-lg">
          <form class="max-w-md mx-auto pb-4" [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Habit title</label>
              <input type="text" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Practice sports" formControlName="name" [class.valid]="form.get('name')?.valid &&
                (form.get('name')?.dirty || form.get('name')?.touched)" [class.invalid]="form.get('name')?.invalid &&
                (form.get('name')?.dirty || form.get('name')?.touched)">
              @if(form.get('name')?.invalid && (form.get('name')?.dirty || form.get('name')?.touched))
              {
              <span class=" text-red-400">Invalid Habit Name</span>
              }
            </div>
            <div class="mb-5">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
              <textarea cols="50" rows="10" formControlName="description" id="description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                [class.valid]="form.get('description')?.valid &&
                (form.get('description')?.dirty || form.get('description')?.touched)" [class.invalid]="form.get('description')?.invalid &&
                (form.get('description')?.dirty || form.get('description')?.touched)">
              </textarea>
              @if(form.get('description')?.invalid && (form.get('description')?.dirty || form.get('description')?.touched))
              {
              <span class=" text-red-400">Invalid Description</span>
              }
            </div>
            <button type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center float-right">Add</button>

            <button type="reset"
              class="mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center float-right">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class HabitFormComponent {

  @Input() userId: string = '';

  private readonly formBuilder = inject(FormBuilder);
  private readonly habitService = inject(HabitsService);

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