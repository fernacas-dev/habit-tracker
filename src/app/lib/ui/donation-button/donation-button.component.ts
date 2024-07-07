import { Component } from '@angular/core';

@Component({
  selector: 'app-donation-button',
  standalone: true,
  template: `
      <div class="py-4 mx-2">
        <a href='https://ko-fi.com/T6T14PGKO' target='_blank'><img height='36' style='border:0px;height:36px;'
            src='https://storage.ko-fi.com/cdn/kofi5.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
      </div>
  `,
})
export class DonationButtonComponent {

}
