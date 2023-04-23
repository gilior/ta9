import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Store } from '@ngrx/store';
import { setItems } from 'src/store/data.actions';
import { Item } from 'src/const';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ta9-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ta9';
  private path: string = "/assets";
  listView: boolean = true;
  subset: Item[] | undefined = undefined;;
  constructor(private dataService: DataService, private store: Store, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.matIconRegistry
      .addSvgIcon("tile", this.setPath(`${this.path}/tile.svg`))
      .addSvgIcon("list", this.setPath(`${this.path}/list.svg`))
      .addSvgIcon("close", this.setPath(`${this.path}/close.svg`))
      .addSvgIcon("new", this.setPath(`${this.path}/new.svg`))
    this.loadItems();

  }

  loadItems() {
    this.dataService.getItems()
      .subscribe((items: Item[]) => {
        this.store.dispatch(setItems({ items }));
      })
  }

  onListViewClick() {
    this.subset = undefined;
    this.listView = true;
  }

  onTileViewClick() {
    this.subset = undefined;
    this.listView = false;
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onTileSelected(items: Item[]) {
    this.listView = true;
    this.subset = items;
  }

}
