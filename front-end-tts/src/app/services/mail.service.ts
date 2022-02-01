import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { url } from './config-URL';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  URL = url;

  constructor(
    private http: HttpClient
  ) { }

  sender_mail(fio, email, phone, message) {
    const obj = {
      fio,
      email,
      phone,
      message
    };
    console.log(email);
    return this.http.post(`${this.URL}mail`, obj).pipe(map((res: any) => res));
  }
}
