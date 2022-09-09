import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import { GalleryApiService } from '../../gallery-api/gallery-api.service';

import * as GalleryActions from './gallery.actions';

@Injectable()
export class GalleryEffects {
  constructor(
    private readonly actions$: Actions,
    private galleryApiService: GalleryApiService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.initGallery),
      fetch({
        run: (action) => {
          return this.galleryApiService.getCatsList().pipe(
            map((res) =>
              GalleryActions.loadGallerySuccess({
                gallery: res,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return GalleryActions.loadGalleryFailure({ error });
        },
      })
    )
  );
}
