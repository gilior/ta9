import { createAction, props } from '@ngrx/store';
import { Item } from 'src/const';

export const setItems = createAction(
  'set items',
  props<{ items: Item[] }>()
);


export const selectItem = createAction(
  'selecte item',
  props<{ item: Item|undefined }>()
);

export const updateOrAddItem = createAction(
  'update item',
  props<{ updatedItem: Item }>()
);

