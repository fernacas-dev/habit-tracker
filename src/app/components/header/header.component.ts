import { Component, inject, Input, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() userId: string = '';

  authService = inject(AuthService);

  async logout() {
    this.authService.logout();
  }
}
