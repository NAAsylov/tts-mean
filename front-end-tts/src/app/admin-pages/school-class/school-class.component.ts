import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ConfigSchoolService } from '../../services/config-school.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Location } from '@angular/common';

@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.css']
})
export class SchoolClassComponent implements OnInit {

  angForm: FormGroup;
  classs: any;

  constructor(
    private formBuilder: FormBuilder,
    private configSchoolService: ConfigSchoolService,
    private flashMessages: FlashMessagesService,
    private location: Location
  ) {
    this.angForm = this.formBuilder.group({
      NumberClass: ['', Validators.required ],
    });
   }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getNC() {
    this.configSchoolService.get_school_class().subscribe((data) => {
      this.classs = data;
    });
  }

   addNC(NumberClass) {
    this.configSchoolService.add_school_class(NumberClass).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Класс успешно добавлен', {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.delay(2000).then(any => {
          location.reload();
        });
      } else {
        this.flashMessages.show('Ошибка, класс не добавлен', {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      }
    });
  }

  deleteNC(id) {
    if (confirm('Подтвердите удаление')) {
      this.configSchoolService.del_school_class(id).subscribe(res => {
        this.classs.splice(id, 1);
      });
      this.flashMessages.show('Класс удален', {
        cssClass: 'alert-warning',
        timeout: 2000
      });
      this.delay(1000).then(any => {
        location.reload();
      });
    }
  }

  ngOnInit(): void {
    this.configSchoolService.get_school_class().subscribe((data) => {
      this.classs = data;
  });
  }

}
