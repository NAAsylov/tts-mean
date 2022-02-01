import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HistoryService } from '../services/history.service';
import { CommonService } from '../services/common.service';
import { History } from '../models/history';
import { Role } from '../models/role';

@Component({
  selector: 'app-about-school',
  templateUrl: './about-school.component.html',
  styleUrls: ['./about-school.component.css']
})
export class AboutSchoolComponent implements OnInit {

  public history: History;
  public historys: any [];
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService,
    private commonService: CommonService
  ) {
    this.history = new History();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  get isAdmin() {
    return this.currentUser && this.currentUser.user.role === Role.Admin;
  }

  ngOnInit(): void {
    this.getHistory();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getHistory();
    });
  }

  getHistory() {
    this.historyService.get_history().subscribe((data) => {
      this.historys = data;
    });
  }

}
