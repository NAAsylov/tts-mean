import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigSchoolService } from '../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-school-day',
  templateUrl: './school-day.component.html',
  styleUrls: ['./school-day.component.css']
})
export class SchoolDayComponent implements OnInit {

  angForm: FormGroup;
  school_day: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private configSchoolService: ConfigSchoolService,
    private flashMessages: FlashMessagesService,
  ) {
    this.angForm = this.formBuilder.group({
      NameDay: ['', Validators.required ],
      ReductionName: ['', Validators.required ]
    });
   }

   add_school_day(NameDay, ReductionName) {
    this.configSchoolService.add_school_day(NameDay, ReductionName).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Учебный день успешно добавлен', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      } else {
        this.flashMessages.show('Ошибка, учебный день не добавлен', {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      }
    });
  }

  get_school_day() {
    this.configSchoolService.get_school_day().subscribe((data) => {
      this.school_day = data;
    });
  }

  del_school_day(id) {
    if (confirm('Подтвердите удаление')) {
      this.configSchoolService.del_school_day(id).subscribe(res => {
        this.school_day.splice(id, 1);
      });
      this.flashMessages.show('Учебный день удален', {
        cssClass: 'alert-warning',
        timeout: 4000
      });
    }
  }

  ngOnInit(): void {
    this.configSchoolService.get_school_day().subscribe((data) => {
      this.school_day = data;
    });
  }

}
