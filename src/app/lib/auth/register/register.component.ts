import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../../models/login.model';
import { passwordMatchValidator } from '../utils/validators';

@Component({
  selector: 'app-register',
  template: `
    <div class="sm:container flex flex-row justify-center mx-1 sm:mx-auto my-4 sm:my-12">
      <div class="my-12">
        <div class="mt-2 mb-2 sm:mt-12 sm:mb-4 outline-gray-500 pt-0 rounded outline outline-1 bg-[#f3f4f6]">
          <div class="bg-[#1f2937] p-2">
            <span class="text-3xl mb-2 text-white">Register</span>
          </div>
          <form [formGroup]="form" class="" (ngSubmit)="register()" class="p-4 px-4 sm:px-12">
            <div class="flex flex-col my-4">
              <label class="text-xl my-2" for="email">Email</label>
              <input
                class="w-full sm:w-[350px] h-12 rounded text-xl px-2 border-b-2 border-b-black focus:border-b-transparent bg-white"
                type="text" id="email" formControlName="email" placeholder="johndoe@gmail.com" [class.valid]="form.get('email')?.valid &&
                            (form.get('email')?.dirty || form.get('email')?.touched)" [class.invalid]="form.get('email')?.invalid &&
                            (form.get('email')?.dirty || form.get('email')?.touched)">
              @if(form.get('email')?.invalid && (form.get('email')?.dirty || form.get('email')?.touched))
              {
              <span class="text-lg text-red-400">Invalid Email</span>
              }
            </div>

            <div class="flex flex-col my-4">
              <label class="text-xl my-2" for="name">Username</label>
              <input
                class="w-full sm:w-[350px] h-12 rounded text-xl px-2 border-b-2 border-b-black focus:border-b-transparent bg-white"
                type="text" id="name" formControlName="name" placeholder="johndoe" [class.valid]="form.get('name')?.valid &&
                            (form.get('name')?.dirty || form.get('name')?.touched)" [class.invalid]="form.get('name')?.invalid &&
                            (form.get('name')?.dirty || form.get('name')?.touched)">
              @if(form.get('name')?.invalid && (form.get('name')?.dirty || form.get('name')?.touched))
              {
              <span class="text-lg text-red-400">Invalid Username</span>
              }
            </div>
            <div class="flex flex-col my-4">
              <label class="text-xl my-2" for="password">Password</label>
              <input
                class="w-full sm:w-[350px] h-12 rounded text-xl px-2 border-b-2 border-b-black focus:border-b-transparent bg-white"
                type="password" id="password" formControlName="password" [class.valid]="form.get('password')?.valid &&
                            (form.get('password')?.dirty || form.get('password')?.touched)" [class.invalid]="form.get('password')?.invalid &&
                            (form.get('password')?.dirty || form.get('password')?.touched)">
              @if(form.get('password')?.invalid && (form.get('password')?.dirty || form.get('password')?.touched))
              {
              <span class="text-lg text-red-400">Invalid Password</span>
              }
            </div>

            <div class="flex flex-col my-4">
              <label class="text-xl my-2" for="confirmPassword">Confirm Password</label>
              <input
                class="w-full sm:w-[350px] h-12 rounded text-xl px-2 border-b-2 border-b-black focus:border-b-transparent bg-white"
                type="password" id="confirmPassword" formControlName="confirmPassword" [class.valid]="form.get('confirmPassword')?.valid &&
                            (form.get('confirmPassword')?.dirty || form.get('confirmPassword')?.touched)" [class.invalid]="form.get('confirmPassword')?.invalid &&
                            (form.get('confirmPassword')?.dirty || form.get('confirmPassword')?.touched)">
              @if( form.get('confirmPassword')?.errors?.['passwordMismatch'] &&
              form.get('confirmPassword')?.touched)
              {
              <span class="text-lg text-red-400">Invalid Confirm Password</span>
              }
            </div>

            <div class="flex flex-row justify-end">
              <a [routerLink]="['/auth/login']" aria-label="Login"
                class="mx-6 mt-8 mb-4 w-[125px] px-4 py-2 outline outline-1 rounded hover:outline-2 text-center">Login</a>
              <button type="submit" aria-label="Register"
                class="mt-8 mb-4 w-[125px] px-4 py-2 outline outline-1 hover:outline-2 rounded">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required]],
  }, { validator: passwordMatchValidator('password', 'confirmPassword') });

  register() {
    if (this.form.valid) {
      const registerDto = this.form.value as RegisterDto;
      this.authService
        .register(registerDto).pipe(tap(() => this.router.navigate(['/'])))
        .subscribe();
    }
  }
}
