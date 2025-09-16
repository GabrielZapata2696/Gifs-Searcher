import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  imports: [],
  template: `
    @if (!hasLoaded()) {
      <div class="d-flex justify-content-center">
        <img src="assets/loader.svg" height="35" width="35" alt="Loading..." class="mt-3">
      </div>
    }
    
    <img 
      (load)="onLoad()"
      [src]="url"
      [alt]="alt"
      [style.display]="hasLoaded() ? '' : 'none'"
      class="card-img-top animate__animated animate__fadeIn"
    />
  `,
  styles: [`
    img {
      height: 250px;
      object-fit: cover;
    }
  `]
})
export class LazyImageComponent {
  
  @Input({ required: true }) url!: string;
  @Input() alt: string = '';
  
  public hasLoaded = signal<boolean>(false);
  
  onLoad(): void {
    this.hasLoaded.set(true);
  }
}
