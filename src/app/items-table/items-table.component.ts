import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Item } from 'src/const';
import { selectItem } from 'src/store/data.actions';
import { State } from 'src/store/data.reducer';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ta9-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})




export class ItemsTableComponent {
  displayedColumns: string[] = ['color', 'name', 'create', 'update', 'by'];
  dataSource: MatTableDataSource<Item>;
  @Output() toggleDrawer = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() subset: Item[] | undefined = undefined;
  items: Item[];

  constructor(private readonly store: Store<{ data: State }>) {

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.store.select(state => state.data.items).subscribe((items: Item[]) => {
      this.items = items;
      this.updateTableSource(items);
    });
  }

  private updateTableSource(items: Item[]) {
    this.dataSource.data = this.subset || items;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateTableSource(this.items);
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(item: Item) {
    this.store.dispatch(selectItem({ item }));
    this.toggleDrawer.emit();
  }
}
