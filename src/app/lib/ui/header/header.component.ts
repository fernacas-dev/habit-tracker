import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { DonationButtonComponent } from '../donation-button/donation-button.component';

@Component({
  selector: 'app-header',
  imports: [DonationButtonComponent],
  standalone: true,
  template: `
  <div class="flex flex-row justify-between outline-1 outline-black shadow bg-[#1f2937]">
    <div class="mx-6 mb-4 mt-2 md:text-3xl sm:text-xl text-white">Habits Tracker</div>
    <div class="flex flex-row">
      <app-donation-button></app-donation-button>
      <button class="mx-6 mt-2 mb-2 w-[125px] px-4 py-2 outline outline-1 rounded hover:outline-2 border-white text-white"
          aria-label="Leave Room" (click)="logout()">
          Logout</button>
    </div>

  </div>
  `,
})
export class HeaderComponent {
  @Input() userId: string = '';

  authService = inject(AuthService);

  async logout() {
    this.authService.logout();
  }
}
