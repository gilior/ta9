import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Item, generateRandomString } from 'src/const';
import { State } from 'src/store/data.reducer';
import { Output, EventEmitter } from '@angular/core';
import { selectItem, updateOrAddItem } from 'src/store/data.actions';

@Component({
  selector: 'ta9-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent {
  selectedItem: Item | undefined;
  @Output() toggleDrawer = new EventEmitter();

  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    color: new FormControl('',),
  });

  constructor(private readonly store: Store<{ data: State }>) {

  }

  onSubmit() {
    if (this.itemForm.invalid) return;
    this.store.dispatch(updateOrAddItem({
      updatedItem:
      {
        by: this.selectedItem?.by || 'Harvey Clements',
        description: this.itemForm.get('description')?.value ?? '',
        color: this.itemForm.get('color')?.value || '#000000',
        id: this.selectedItem?.id || generateRandomString(),
        create: this.selectedItem?.create || new Date(),
        name: this.itemForm.get('name')?.value ?? '',
        update: this.selectedItem?.update || new Date()
      }
    }));
    this.toggleDrawer.emit();
    this.itemForm.reset();
    this.store.dispatch(selectItem({ item: undefined }));
  }



  ngOnInit() {
    this.store.select(state => state.data.selectedItem).subscribe((item: Item | undefined) => {
      this.selectedItem = item;
      if (item) {
        this.itemForm.patchValue({
          name: item.name,
          description: item.description,
          color: item.color,
        });
      }
      else {
        this.itemForm.reset();
      }
    });
  }



  onCancelClick() {
    this.toggleDrawer.emit();
    this.itemForm.reset();
    this.store.dispatch(selectItem({ item: undefined }));
  }

}
