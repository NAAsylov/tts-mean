import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ConfigSchoolService } from '../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-school-subject',
  templateUrl: './school-subject.component.html',
  styleUrls: ['./school-subject.component.css']
})
export class SchoolSubjectComponent implements OnInit {

  angForm: FormGroup;
  subjects: any;

  constructor(
    private formBuilder: FormBuilder,
    private configSchoolService: ConfigSchoolService,
    private flashMessages: FlashMessagesService
  ) {
    this.angForm = this.formBuilder.group({
      NameSubject: ['', Validators.required ],
    });
   }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  addSubject(NameSubject) {
    this.configSchoolService.add_subject(NameSubject).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Предмет успешно добавлен', {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.delay(2000).then(any => {
          location.reload();
        });
      } else {
        this.flashMessages.show('Ошибка, предмет не добавлен', {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      }
    });
  }

  getSubject() {
    this.configSchoolService.get_subject().subscribe((data) => {
      this.subjects = data;
    });
  }

  deleteSubject(id) {
    if (confirm('Подтвердите удаление')) {
      this.configSchoolService.del_subject(id).subscribe(res => {
        this.subjects.splice(id, 1);
      });
      this.flashMessages.show('Учебный предмет удален', {
        cssClass: 'alert-warning',
        timeout: 2000
      });
      this.delay(1000).then(any => {
        location.reload();
      });
    }
  }

  ngOnInit(): void {
    this.configSchoolService.get_subject().subscribe((data) => {
      this.subjects = data;
    });
  }

}
