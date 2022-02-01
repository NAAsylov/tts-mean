import { Component, OnInit } from '@angular/core';
import { ConfigSchoolService } from '../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as $ from 'jquery';

@Component({
  selector: 'app-general-schedule',
  templateUrl: './general-schedule.component.html',
  styleUrls: ['./general-schedule.component.css']
})
export class GeneralScheduleComponent implements OnInit {

  classs: any;
  gss: any;
  days: any;
  nowday: any;

  constructor(
    private configSchoolService: ConfigSchoolService,
    private flashMessages: FlashMessagesService
  ) {
    this.nowday = new Date();
    this.nowday = this.nowday.getDay();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  deleteGS(id) {
    if (confirm('Подтвердите удаление')) {
      this.configSchoolService.delete_general_schedule(id).subscribe(res => {
        this.gss.splice(id, 1);
      });
      this.flashMessages.show('Урок удален', {
        cssClass: 'alert-warning',
        timeout: 2000
      });
      this.delay(1000).then(any => {
        location.reload();
      });
    }
  }

  getGS() {
    this.configSchoolService.get_general_schedule().subscribe((data: any) => {
      this.gss = data;
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

  openMonday() {
    $('._monday').toggleClass('_active');
  }
  openTuesday() {
    $('._tuesday').toggleClass('_active');
  }
  openWednesday() {
    $('._wednesday').toggleClass('_active');
  }
  openThursday() {
    $('._thursday').toggleClass('_active');
  }
  openFriday() {
    $('._friday').toggleClass('_active');
  }
  openSaturday() {
    $('._saturday').toggleClass('_active');
  }
  openSunday() {
    $('._sunday').toggleClass('_active');
  }

  ngOnInit() {
    this.configSchoolService.get_general_schedule().subscribe((data: any) => {
      this.gss = data;
    });
    this.configSchoolService.get_school_class().subscribe((data) => {
      this.classs = data;
    });
    this.configSchoolService.get_school_day().subscribe((data) => {
      this.days = data;
    });
  }
}
