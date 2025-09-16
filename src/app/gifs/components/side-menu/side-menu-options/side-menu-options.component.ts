import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gif.service';


interface MenuOption {
  label: string;
  sublabel: string;
  route: string
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',

})
export class SideMenuOptionsComponent {

  public gifService = inject(GifService);



  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      sublabel: 'Gifs populares',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-fire'
    },
    {
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    },

  ];


}
