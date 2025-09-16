import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { GifListComponent } from "../../components/side-menu/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  public gifService = inject(GifService);

  public query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  );

  public gifsByKey = computed(() => {
    return this.gifService.getHistoryByKey(this.query());
  });



}
