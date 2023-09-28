import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a [routerLink]="['/dashboard']">
        <img
          src="./assets/images/logos/pibro-logo.png"
          class="max-h-9 align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() { }
}
