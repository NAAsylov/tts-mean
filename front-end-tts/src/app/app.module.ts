import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthGuard } from './helpers/auth.guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminAccountComponent } from './admin-pages/admin-account/admin-account.component';
import { UserAccountComponent } from './user-pages/user-account/user-account.component';
import { SchoolDayComponent } from './admin-pages/school-day/school-day.component';
import { SchoolSubjectComponent } from './admin-pages/school-subject/school-subject.component';
import { SubjectAddComponent } from './admin-pages/general-schedule/subject-add/subject-add.component';
import { SubjectEditComponent } from './admin-pages/general-schedule/subject-edit/subject-edit.component';
import { GeneralScheduleComponent } from './admin-pages/general-schedule/general-schedule.component';
import { SchoolClassComponent } from './admin-pages/school-class/school-class.component';
import { SchoolBuzzerComponent } from './admin-pages/school-buzzer/school-buzzer.component';
import { BuzzerEditComponent } from './admin-pages/school-buzzer/buzzer-edit/buzzer-edit.component';
import { UserScheduleComponent } from './user-pages/user-schedule/user-schedule.component';
import { AboutSchoolComponent } from './about-school/about-school.component';
import { AboutSchoolEditComponent } from './about-school/about-school-edit/about-school-edit.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminAccountComponent,
    UserAccountComponent,
    SchoolDayComponent,
    SchoolSubjectComponent,
    SubjectAddComponent,
    SubjectEditComponent,
    GeneralScheduleComponent,
    SchoolClassComponent,
    SchoolBuzzerComponent,
    BuzzerEditComponent,
    UserScheduleComponent,
    AboutSchoolComponent,
    AboutSchoolEditComponent,
    ContactComponent,
  ],
  imports: [
    FlashMessagesModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
