import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { url } from './config-URL';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = url;

  constructor(private http: HttpClient) { }

  // ПОЛУЧИТЬ СПИСОК ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ИЗ БД
  getAll() {
    return this.http.get(`${this.URL}account/users`)
  }

  // ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЯ ИЗ БД ПО ЕГО ID
  getById(id: number) {
    return this.http.get(`${this.URL}account/users/` + id);
  }

}
