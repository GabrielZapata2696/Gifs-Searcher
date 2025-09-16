import {  Component, input } from '@angular/core';
import { GifListItemComponent } from "../../gif-list-item/gif-list-item.component";
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',

})
export class GifListComponent {
  // Input property to receive the list of GIF URLs

  public gifs = input.required<Gif[]>();


 }
