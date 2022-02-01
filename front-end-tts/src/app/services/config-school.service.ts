import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { url } from './config-URL';

@Injectable({
  providedIn: 'root'
})
export class ConfigSchoolService {

  URL = url;

  constructor(
    private http: HttpClient
  ) { }



  // ФУНКЦИИ ДОБАВЛЕНИЯ В БД
    // учебные дни
  add_school_day(NameDay: string, ReductionName: string) {
    const obj = {
      NameDay,
      ReductionName
    };
    return this.http.post(`${this.URL}days-study/add`, obj).pipe(map((res: any) => res));
  }
    // учебные предметы
  add_subject(NameSubject: string) {
    const obj = {
      NameSubject
    };
    return this.http.post(`${this.URL}subject/add`, obj).pipe(map((res: any) => res));
  }
    // школьные классы
  add_school_class(NumberClass: number) {
    const obj = {
      NumberClass
    };
    return this.http.post(`${this.URL}number-class/add`, obj).pipe(map((res: any) => res));
  }
    // звонки
  add_buzzer_lesson(NumberLesson: number, StartLesson: string, EndLesson: string) {
    const obj = {
      NumberLesson,
      StartLesson,
      EndLesson
    };
    return this.http.post(`${this.URL}call-schedule/add`, obj).pipe(map((res: any) => res));
  }

    // уроки в расписание
  add_general_schedule(NumberLesson, DayLesson, ClassLesson, NameLesson) {
    const obj = {
      NumberLesson,
      DayLesson,
      ClassLesson,
      NameLesson
    };
    return this.http.post(`${this.URL}general-schedule/add`, obj).pipe(map((res: any) => res));
  }



  // ФУНКЦИИ УДАЛЕНИЯ ИЗ БД
    // учебные дни
  del_school_day(id) {
    return this.http.get(`${this.URL}days-study/delete/${id}`);
  }
    // учебные предметы
  del_subject(id) {
    return this.http.get(`${this.URL}subject/delete/${id}`);
  }
    // школьные классы
  del_school_class(id) {
    return this.http.get(`${this.URL}number-class/delete/${id}`);
  }
     // звонки
  del_buzzer_lesson(id) {
    return this.http.get(`${this.URL}call-schedule/delete/${id}`);
  }

    // уроки в расписании
  delete_general_schedule(id) {
    return this.http.get(`${this.URL}general-schedule/delete/${id}`);
  }



  // ФУНКЦИИ ПОЛУЧЕНИЯ ДАННЫХ ИЗ БД
    // учебные дни
  get_school_day() {
    return this.http.get<any>(`${this.URL}days-study/`);
  }
    // учебные предметы
  get_subject() {
    return this.http.get<any>(`${this.URL}subject/`);
  }
    // школьные классы
  get_school_class() {
    return this.http.get<any>(`${this.URL}number-class/`);
  }
    // звонки
  get_buzzer_lesson() {
    return this.http.get<any>(`${this.URL}call-schedule/`);
  }

    // уроки в расписании
  get_general_schedule() {
    return this.http.get(`${this.URL}general-schedule/`);
  }



  // ФУНКЦИИ ИЗМЕНЕНИЯ ДАННЫХ
    // звонки
  edit_buzzer_lesson(id) {
    return this.http.get(`${this.URL}call-schedule/edit/${id}`);
  }

    // уроки в расписании
  edit_general_schedule(id) {
    return this.http.get(`${this.URL}general-schedule/edit/${id}`);
  }



  // ФУНКЦИИ ОБНОВЛЕНИЯ ДАННЫХ
    // звонки
  update_buzzer_lesson(NumberLesson, StartLesson, EndLesson, id) {
    const obj = {
      NumberLesson,
      StartLesson,
      EndLesson
    };
    return this.http.post(`${this.URL}call-schedule/update/${id}`, obj).pipe(map((res: any) => res));
  }

    // уроки в расписании
  update_general_schedule(NumberLesson, DayLesson, ClassLesson, NameLesson, id) {
    const obj = {
      NumberLesson,
      DayLesson,
      ClassLesson,
      NameLesson
    };
    return this.http.post(`${this.URL}general-schedule/update/${id}`, obj)
      .pipe(map((res: any) => res));
  }

}
