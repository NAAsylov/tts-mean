import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  angForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mailService: MailService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {
    this.angForm = this.formBuilder.group({
      fio: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      message: ['', Validators.required ]
    });
  }

  sender_mail(fio, email, phone, message) {
    this.route.params.subscribe(params => {
      this.mailService.sender_mail(fio, email, phone, message)
      .subscribe(data => {
        if (data) {
          this.flashMessages.show('Сообщение отправлено', {
            cssClass: 'alert-success',
            timeout: 4000
          });
        } else {
          this.flashMessages.show('Ошибка отправки', {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        }
      });
    });
  }

  ngOnInit(): void {
  }

}
