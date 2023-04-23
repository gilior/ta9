import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { dataReducer } from 'src/store/data.reducer';
import { ItemsTableComponent } from './items-table/items-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ItemFormComponent } from './item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ItemsTileComponent } from './items-tile/items-tile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    ItemsTableComponent,
    ItemFormComponent,
    ItemsTileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    StoreModule.forRoot({ data: dataReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
