import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ConfigSchoolService } from '../../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.css']
})
export class SubjectAddComponent implements OnInit {

  angForm: FormGroup;
  gss: any;
  subjects: any;
  classs: any;
  days: any;

  constructor(
    private formBuilder: FormBuilder,
    private configSchoolService: ConfigSchoolService,
    private flashMessages: FlashMessagesService
  ) {
    this.angForm = this.formBuilder.group({
      NumberLesson: ['', Validators.required ],
      DayLesson: ['', Validators.required ],
      ClassLesson: ['', Validators.required ],
      NameLesson: ['', Validators.required ]
    });
   }

   addGS(NumberLesson, DayLesson, ClassLesson, NameLesson) {
    this.configSchoolService.add_general_schedule(NumberLesson, DayLesson, ClassLesson, NameLesson)
    .subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Урок успешно добавлен', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      } else {
        this.flashMessages.show('Ошибка, урок не добавлен', {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      }
    });
    }

    getNS() {
      this.configSchoolService.get_subject().subscribe((data) => {
        this.subjects = data;
      });
    }

    getNC() {
      this.configSchoolService.get_school_class().subscribe((data) => {
        this.classs = data;
      });
    }

    getDS() {
      this.configSchoolService.get_school_day().subscribe((data) => {
        this.days = data;
      });
    }

  ngOnInit(): void {
    this.configSchoolService.get_subject().subscribe((data) => {
      this.subjects = data;
    });
    this.configSchoolService.get_school_class().subscribe((data) => {
      this.classs = data;
    });
    this.configSchoolService.get_school_day().subscribe((data) => {
      this.days = data;
    });
  }

}
