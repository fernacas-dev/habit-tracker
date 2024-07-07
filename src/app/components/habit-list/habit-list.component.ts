import { Component, inject, Input, OnInit } from '@angular/core';
import { HabitItemComponent } from '../habit-item/habit-item.component';
import { HabitsService } from '../../services/habits.service';
import { CommonModule } from '@angular/common';
import { NgxBottomSheetModalService } from 'ngx-bottom-sheet-modal';
import { ModalComponent } from '../modal/modal.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [HabitItemComponent, CommonModule, SpinnerComponent],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.scss'
})
export class HabitListComponent implements OnInit {

  @Input() userId: string = '';

  private readonly habitsService = inject(HabitsService);
  private readonly ngxBottomSheetModalService = inject(NgxBottomSheetModalService);

  itemHeatmaps$ = this.habitsService.items$;

  toggleUpdated(data: { id: string, date: Date, event: boolean }) {
    if (data.event) {
      this.habitsService.addItem(data.id, data.date).subscribe(() => this.habitsService._items$.next(this.userId));
    } else {
      this.habitsService.removeItem(data.id, data.date).subscribe(() => this.habitsService._items$.next(this.userId));
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
          this.habitsService.removeHabit(id).subscribe(() => this.habitsService._items$.next(this.userId));
          this.ngxBottomSheetModalService.closeBottomSheet();
        }
      },
      onClose: () => {
        this.opened = false;
      },
      closeButtonClass: "text-cyan-400 dark:text-cyan-200",
    });
    this.opened = true;
  }
}
