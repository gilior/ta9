import { createReducer, on } from '@ngrx/store';
import { selectItem, setItems, updateOrAddItem } from './data.actions';
import { Item } from 'src/const';
export type State = {
  items: Item[];
  selectedItem?: Item,
}
export const initialState: State = { items: [] };

export const dataReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items })),
  on(selectItem, (state, { item }) => ({ ...state, selectedItem: item })),
  on(updateOrAddItem, (state, { updatedItem}) => {
    const items = [...state.items];
    let existingItemIndex = items.findIndex((item) => item.id === updatedItem.id);
    if (existingItemIndex > -1) {
      items[existingItemIndex] = { ...updatedItem };
    }
    else {
      items.push(updatedItem);
    }
    return { items: items, selectedItem: state.selectedItem }
  }),
);