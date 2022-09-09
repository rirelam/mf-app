import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import {
  GALLERY_FEATURE_KEY,
  GalleryState,
  galleryAdapter,
} from './gallery.reducer';

// Lookup the 'Gallery' feature state managed by NgRx
export const getGalleryState =
  createFeatureSelector<GalleryState>(GALLERY_FEATURE_KEY);

const { selectAll, selectEntities } = galleryAdapter.getSelectors();

export const getGalleryLoaded = createSelector(
  getGalleryState,
  (state: GalleryState) => state.loaded
);

export const getGalleryError = createSelector(
  getGalleryState,
  (state: GalleryState) => state.error
);

export const getAllGallery = createSelector(
  getGalleryState,
  (state: GalleryState) => selectAll(state)
);

export const getGalleryEntities = createSelector(
  getGalleryState,
  (state: GalleryState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getGalleryState,
  (state: GalleryState) => state.selectedId
);

export const getSelected = createSelector(
  getGalleryEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getSelectedCats = createSelector(
    getGalleryState,
    (state: GalleryState) => state.selectedCats
);
