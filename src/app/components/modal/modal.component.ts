import { Component, inject, Input } from '@angular/core';
import { NgxBottomSheetModalService } from 'ngx-bottom-sheet-modal';


@Component({
  selector: "app-modal",
  standalone: true,
  imports: [],
  template: `
    <div class="pt-4 lg:w-96 overflow-auto max-h-screen md:overflow-hidden bg-gray-800 dark:text-white">
      <div class="px-4">
        <h1 class="font-bold text-xl">{{ title }}</h1>
        <p class="my-4 py-8">{{ description }}</p>
      </div>
      <!-- <p class="px-4 py-2 mt-4 bg-slate-200 dark:bg-slate-700">ⓘ Tap outside or click button below to close.</p>
      <div class="px-4 overflow-auto md:max-h-96">
        <p class="pt-4 font-semibold" (click)="expandedContent = !expandedContent">
          {{ expandedContent ? "Show less content [-]" : "Show  more content [+]" }}
        </p>
        @if(expandedContent) {
        <p class="py-24">Some text</p>
        <p class="py-24">Some text</p>
        <p class="py-24">Some text</p>
        <p class="py-24">Some text</p>
        }
      </div> -->
      <div class="p-4 flex justify-end sticky bottom-0 bg-gray-800 border-t-2 w-full md:rounded-b-xl">
        <button type="button" (click)="close()" class="mx-2 px-4 bg-red-500 text-white text-sm leading-6 font-medium py-2 rounded-lg">Close</button>
        <button type="button" (click)="okAction()" class="mx-2 px-4 bg-green-500 text-white text-sm leading-6 font-medium py-2 rounded-lg">Remove</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ModalComponent {
  // Services
  private readonly ngxBottomSheetModalService = inject(NgxBottomSheetModalService);

  // Inputs
  @Input() title!: string;
  @Input() description!: string;
  @Input() okAction!: () => void;

  // State
  expandedContent: boolean = false;

  close() {
    this.ngxBottomSheetModalService.closeBottomSheet();
  }
}
