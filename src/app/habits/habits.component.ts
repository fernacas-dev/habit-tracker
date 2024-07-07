import { Component, inject } from '@angular/core';
import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { NgxBottomSheetModalComponent } from 'ngx-bottom-sheet-modal';
import { CommonModule } from '@angular/common';
import { HeatMapComponent } from '@lib/ui/heat-map/heat-map.component';
import { AuthService } from '@lib/auth/services/auth.service';
import { HeaderComponent } from '@lib/ui/header/header.component';
import { ToggleComponent } from '@lib/ui/toggle/toggle.component';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [HeatMapComponent, ToggleComponent, HabitListComponent, HabitFormComponent, NgxBottomSheetModalComponent, CommonModule, HeaderComponent],
  template: `
    @if(user$ | async; as user) {
      <app-header [userId]="user.userId"></app-header>
      <div class="flex justify-center">
        <div class="w-full md:w-3/4 sm:mx-0 md:px-10">
          <div class="fixed bottom-6 right-6">
            @if(!isCreating){
            <button (click)="onToggled()"
              class="z-100 bg-green-500 text-white font-medium rounded-full py-4 px-6 flex items-center justify-center hover:bg-yellow-600 transition duration-300 ease-in-out shadow-lg">
              +
            </button>
            } @else {
            <button (click)="onToggled()"
              class="z-100 bg-red-500 text-white font-medium rounded-full py-4 px-6 flex items-center justify-center hover:bg-yellow-600 transition duration-300 ease-in-out shadow-lg">
              X
            </button>
            }
          </div>
          @if(isCreating){
          <app-habit-form [userId]="user.userId"></app-habit-form>
          }
          <app-habit-list [userId]="user.userId"></app-habit-list>
        </div>
      </div>
    }
    <ngx-bottom-sheet-modal></ngx-bottom-sheet-modal>
  `,
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
