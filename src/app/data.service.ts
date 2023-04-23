import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/const';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  dataUrl = '../assets/items.json'
  getItems() {
    return this.http.get<Item[]>(this.dataUrl);
  }
}
