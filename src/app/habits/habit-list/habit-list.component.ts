import { Component, inject, Input, OnInit } from '@angular/core';
import { HabitItemComponent } from '../habit-item/habit-item.component';
import { CommonModule } from '@angular/common';
import { NgxBottomSheetModalService } from 'ngx-bottom-sheet-modal';
import { SpinnerComponent } from '@lib/ui/spinner/spinner.component';
import { ModalComponent } from '@lib/ui/modal/modal.component';
import { HabitsService } from '@habits/services/habits.service';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [HabitItemComponent, CommonModule, SpinnerComponent],
  template: `
    <ul class="my-8">
      @if(itemHeatmaps$ | async; as itemHeatmaps){
        @for(itemHeatmap of itemHeatmaps$|async; track $index) {
        <app-habit-item [itemHeatmap]="itemHeatmap" (toggleUpdated)="toggleUpdated($event)"
          (removeHabit)="removeHabit($event)"></app-habit-item>
        }
      }
      @else {
        <app-spinner></app-spinner>
      }
    </ul>
  `,
})
export class HabitListComponent implements OnInit {

  @Input() userId: string = '';

  private readonly habitsService = inject(HabitsService);
  private readonly ngxBottomSheetModalService = inject(NgxBottomSheetModalService);

  itemHeatmaps$ = this.habitsService.items$;

  toggleUpdated(data: { id: string, date: Date, event: boolean }) {
    if (data.event) {
      this.habitsService.addItem(data.id, data.date, this.userId);
    } else {
      this.habitsService.removeItem(data.id, data.date, this.userId);
    }
  }

  ngOnInit(): void {
    this.habitsService._items$.next(this.userId);
  }

  removeHabit(event: string) {
    this.openBottomSheetModal(event);
  }

  opened: boolean = false;

  openBottomSheetModal(id: string) {
    this.ngxBottomSheetModalService.openBottomSheet({
      contentComponent: ModalComponent,
      inputs: {
        title: "Remove Habit",
        description: "Are you sure you want to remove this habit?",
        okAction: () => {
          this.habitsService.removeHabit(id, this.userId);
          this.ngxBottomSheetModalService.closeBottomSheet();
        }
      },
      onClose: () => {
        this.opened = false;
      },
      closeButtonClass: "text-red-500",
    });
    this.opened = true;
  }
}
