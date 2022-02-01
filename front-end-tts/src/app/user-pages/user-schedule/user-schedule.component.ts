import { Component, OnInit, ViewChild, ElementRef, Renderer2, SystemJsNgModuleLoader } from '@angular/core';
import { ConfigSchoolService } from '../../services/config-school.service';
import { AuthenticationService } from '../../services/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.css']
})
export class UserScheduleComponent implements OnInit {

  @ViewChild('table')
  private elRef: ElementRef;

  days: any;
  classs: any;
  gss: any;
  user: any;
  calls: any;
  nowday: any;

  constructor(
    private configSchoolService: ConfigSchoolService,
    private authenticationService: AuthenticationService,
    private renderer: Renderer2
  ) {
    this.authenticationService.currentUser.subscribe(x => this.user = x);
    this.nowday = new Date();
    this.nowday = this.nowday.getDay();
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

  ngOnInit(): void {
    this.configSchoolService.get_general_schedule().subscribe((data: any) => {
      this.gss = data;
    });
    this.configSchoolService.get_school_class().subscribe((data) => {
      this.classs = data;
    });
    this.configSchoolService.get_school_day().subscribe((data) => {
      this.days = data;
    });
    this.configSchoolService.get_buzzer_lesson().subscribe((data: any) => {
      this.calls = data;
    });
  }

}
