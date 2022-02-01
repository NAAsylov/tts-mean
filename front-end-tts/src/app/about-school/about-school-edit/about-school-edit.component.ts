import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-about-school-edit',
  templateUrl: './about-school-edit.component.html',
  styleUrls: ['./about-school-edit.component.css']
})
export class AboutSchoolEditComponent implements OnInit {

  angForm: FormGroup;
  history: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {
    this.angForm = this.formBuilder.group({
      description: ['', Validators.required ]
    });
   }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  updateHistory(description) {
    this.route.params.subscribe(params => {
      this.historyService.update_history(description, params.id)
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
        this.router.navigate(['about-school']);
      });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.historyService.edit_history(params['id']).subscribe(res => {
        this.history = res;
    });
  });
  }

}
