import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/const';
import { State } from 'src/store/data.reducer';

@Component({
  selector: 'ta9-items-tile',
  templateUrl: './items-tile.component.html',
  styleUrls: ['./items-tile.component.scss']
})
export class ItemsTileComponent {
  map: Map<string, Item[]>;
  constructor(private readonly store: Store<{ data: State }>) {

  }
  @Output() onTileSelected = new EventEmitter<Item[]>();

  ngOnInit() {
    this.store.select(state => state.data.items).subscribe((items: Item[]) => {
      this.map = new Map<string, Item[]>();
      items?.forEach(item => {
        if (this.map.has(item.name)) {
          this.map.get(item.name)?.push(item);
        }
        else {
          this.map.set(item.name, [item])
        }
      })
    });
  }

  onTileClick(name: string) {
    this.onTileSelected.emit(this.map.get(name) ?? []);
  }
}
