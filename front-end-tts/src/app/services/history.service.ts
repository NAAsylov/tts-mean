import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { url } from './config-URL';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  URL = url;

  constructor(
    private http: HttpClient
  ) { }

  get_history() {
    return this.http.get<any>(`${this.URL}about-school/`);
  }

  edit_history(id) {
    return this.http.get(`${this.URL}about-school/edit/${id}`);
  }

  update_history(description, id) {
    const obj = {
      description
    };
    return this.http.post(`${this.URL}about-school/update/${id}`, obj).pipe(map((res: any) => res));
  }
}
