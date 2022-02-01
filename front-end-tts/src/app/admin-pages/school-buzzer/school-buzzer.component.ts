import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ConfigSchoolService } from '../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-school-buzzer',
  templateUrl: './school-buzzer.component.html',
  styleUrls: ['./school-buzzer.component.css']
})
export class SchoolBuzzerComponent implements OnInit {

  angForm: FormGroup;
  calls: any;

  constructor(
    private formBuilder: FormBuilder,
    private configSchoolService: ConfigSchoolService,
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

  addCall(NumberLesson, StartLesson, EndLesson) {
    this.configSchoolService.add_buzzer_lesson(NumberLesson, StartLesson, EndLesson).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Звонки успешно добавлены', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      } else {
        this.flashMessages.show('Ошибка, звонки не добавлены', {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      }
    });
  }

  getCalls() {
    this.configSchoolService.get_buzzer_lesson().subscribe((data) => {
      this.calls = data;
  });
  }

  deleteCall(id) {
    if (confirm('Подтвердите удаление')) {
      this.configSchoolService.del_buzzer_lesson(id).subscribe(res => {
        this.calls.splice(id, 1);
      });
      this.flashMessages.show('Звонки удалены', {
        cssClass: 'alert-warning',
        timeout: 2000
      });
      this.delay(1000).then(any => {
        location.reload();
      });
    }
}

  ngOnInit() {
    this.configSchoolService.get_buzzer_lesson().subscribe((data: any) => {
      this.calls = data;
  });
  }

}
