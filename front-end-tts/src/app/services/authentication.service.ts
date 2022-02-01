import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { url } from './config-URL';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  userRole: any;

  URL = url;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(username: string, password: string) {
    return this.http.post<any>(
      `${this.URL}account/register`,
      { username, password }).pipe(map(res => res));
  }

  login(username: string, password: string) {
        return this.http.post<any>(`${this.URL}account/login`, { username, password })
            .pipe(map(user => {
                // ВХОД ВЫПОЛНЕН УСПЕШНО ЕСЛИ В ОТВЕТЕ ЕСТЬ ТОКЕН JWT
                if (user && user.token) {
                    // СОХ-Е ДАННЫХ ПОЛЬЗОВАТЕЛЯ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ, ЧТОБЫ ОН ВХОДИЛ В СИСТЕМЫ ПРИ ОБНОВЛЕНИИ СТРАНИЦЫ
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

  update(login: string, surname: string, name: string, patronymic: string, school_class: string) {
    return this.http.post<any>(
      `${this.URL}account/update`,
      {login, surname, name, patronymic, school_class }).pipe(map(res => res));
  }

  logout() {
      // УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА, ЧТОБЫ ВЫЙТИ ИЗ СИСТЕМЫ
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      return true;
    } else {
      return false;
    }
  }

  getRoleUser() {
    this.currentUser.subscribe(x => this.userRole = x);
    return this.userRole;
  }


}
