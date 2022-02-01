import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigSchoolService } from '../../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {

  angForm: FormGroup;
  gs: any = {};
  subjects: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configSchoolService: ConfigSchoolService,
    private formBuilder: FormBuilder,
    private flashMessages: FlashMessagesService
  ) {
    this.angForm = this.formBuilder.group({
      NumberLesson: ['', Validators.required ],
      DayLesson: [],
      ClassLesson: [],
      NameLesson: ['', Validators.required ]
    });
   }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  updateGS(NumberLesson, DayLesson, ClassLesson, NameLesson) {
    this.route.params.subscribe(params => {
      this.configSchoolService.update_general_schedule(NumberLesson, DayLesson, ClassLesson, NameLesson, params.id)
      .subscribe(data => {
        if (data) {
          this.flashMessages.show('Урок успешно изменен', {
            cssClass: 'alert-success',
            timeout: 4000
          });
        } else {
          this.flashMessages.show('Ошибка, урок не изменен', {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        }
      });
      this.delay(2000).then(any => {
        this.router.navigate(['general_schedule']);
      });
    });
  }

  getNS() {
    this.configSchoolService.get_subject().subscribe((data) => {
      this.subjects = data;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.configSchoolService.edit_general_schedule(params['id']).subscribe(res => {
        this.gs = res;
      });
    });
    this.configSchoolService.get_subject().subscribe((data) => {
      this.subjects = data;
    });
  }

}
