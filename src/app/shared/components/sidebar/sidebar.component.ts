import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  public history: string[] = []

  constructor(
    private gifsService: GifsService
  ) { }

  get tags(): string[] {
    return this.history = this.gifsService.tagsHistory.slice(0, 9);
  }

  searchTag(tag: string) {
    this.gifsService.searchTag(tag);

  }

}
