import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  accountForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private flashMessages: FlashMessagesService,
  ) {}

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: [],
      school_class: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get f() { return this.accountForm.controls; }

  onSubmit() {
    this.submitted = true;

    // СТОП, ЕСЛИ ФОРМЫ НЕ ЗАПОЛНЕНЫ
    if (this.accountForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.update(this.currentUser.user.login,
      this.currentUser.user.surname, this.currentUser.user.name,
      this.currentUser.user.patronymic, this.currentUser.user.school_class
      ).pipe(first()).subscribe(
        data => {
            this.router.navigate(['user_account']);
            this.flashMessages.show('Изменения сохранены', {
               cssClass: 'alert-success',
               timeout: 4000
             });
             this.loading = false;
        }
      );
}

}
