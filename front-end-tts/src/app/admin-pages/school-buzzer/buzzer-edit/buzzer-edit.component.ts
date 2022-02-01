import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigSchoolService } from '../../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-buzzer-edit',
  templateUrl: './buzzer-edit.component.html',
  styleUrls: ['./buzzer-edit.component.css']
})
export class BuzzerEditComponent implements OnInit {

  angForm: FormGroup;
  call: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private configSchoolService: ConfigSchoolService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {
    this.angForm = this.formBuilder.group({
      NumberLesson: ['', Validators.required ],
      StartLesson: ['', Validators.required ],
      EndLesson: ['', Validators.required ]
    });
   }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  updateCall(NumberLesson, StartLesson, EndLesson) {
    this.route.params.subscribe(params => {
      this.configSchoolService.update_buzzer_lesson(NumberLesson, StartLesson, EndLesson, params.id)
      .subscribe(data => {
        if (data) {
          this.flashMessages.show('Изменения приняты', {
            cssClass: 'alert-success',
            timeout: 4000
          });
        } else {
          this.flashMessages.show('Ошибка, изменения не приняты', {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        }
      });
      this.delay(2000).then(any => {
        this.router.navigate(['school_buzzer']);
      });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.configSchoolService.edit_buzzer_lesson(params['id']).subscribe(res => {
        this.call = res;
    });
  });
  }

}
