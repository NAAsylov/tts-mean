import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private flashMessages: FlashMessagesService,
  ) {
    // ПЕРЕНАПРАВЛЕНИЕ НА ДОМАШНЮЮ СТРАНИЦУ, ЕСЛИ ВХОД УЖЕ ВЫПОЛНЕН
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // ПОЛУЧИТЬ URL-АДРЕС ВОЗВРАТА ИЗИ ПАРАМЕТРОВ МАРШРУТА ИЛИ ПОЛ УМОЛЧАНИЮ "/"
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // ПОЛУЧЕНИЕ ДАННЫХ С ФОРМ
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // СТОП, ЕСЛИ ФОРМЫ НЕ ЗАПОЛНЕНЫ
      if (this.loginForm.invalid) {
        return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first()).subscribe(
              data => {
                if (data.success) {
                  this.router.navigate([this.returnUrl]);
                  this.flashMessages.show('Вы успешно авторизовались', {
                    cssClass: 'alert-success',
                    timeout: 4000
                  });
                  this.loading = false;
                } else {
                  this.flashMessages.show('Не верный логин или пароль', {
                    cssClass: 'alert-danger',
                    timeout: 4000
                  });
                  this.loading = false;
                }
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }

}
