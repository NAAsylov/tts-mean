import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // ПОЛУЧИТЬ URL-АДРЕС ВОЗВРАТА ИЗИ ПАРАМЕТРОВ МАРШРУТА ИЛИ ПОЛ УМОЛЧАНИЮ "/"
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // ПОЛУЧЕНИЕ ДАННЫХ С ФОРМ
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // СТОП, ЕСЛИ ФОРМЫ НЕ ЗАПОЛНЕНЫ
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value)
        .pipe(first()).subscribe(data => {
          if (data.success) {
            this.router.navigate(['/login']);
            this.flashMessages.show('Вы успешно зарегистрировались', {
              cssClass: 'alert-success',
              timeout: 4000
            });
            this.loading = false;
          } else {
            this.flashMessages.show(data.msg, {
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
