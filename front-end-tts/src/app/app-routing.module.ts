import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ИМПОРТ КОМПОНЕНТОВ
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminAccountComponent } from './admin-pages/admin-account/admin-account.component';
import { UserAccountComponent } from './user-pages/user-account/user-account.component';
import { SchoolDayComponent } from './admin-pages/school-day/school-day.component';
import { SchoolSubjectComponent } from './admin-pages/school-subject/school-subject.component';
import { SchoolClassComponent } from './admin-pages/school-class/school-class.component';
import { SchoolBuzzerComponent } from './admin-pages/school-buzzer/school-buzzer.component';
import { BuzzerEditComponent } from './admin-pages/school-buzzer/buzzer-edit/buzzer-edit.component';
import { GeneralScheduleComponent } from './admin-pages/general-schedule/general-schedule.component';
import { SubjectAddComponent } from './admin-pages/general-schedule/subject-add/subject-add.component';
import { SubjectEditComponent } from './admin-pages/general-schedule/subject-edit/subject-edit.component';
import { UserScheduleComponent } from './user-pages/user-schedule/user-schedule.component';
import { AboutSchoolComponent } from './about-school/about-school.component';
import { AboutSchoolEditComponent } from './about-school/about-school-edit/about-school-edit.component';
import { ContactComponent } from './contact/contact.component';

// ИМПОРТ ХЭЛПЕРОВ
import { AuthGuard } from './helpers/auth.guard';

// ИМПОРТ МОДЕЛЕЙ
import { Role } from './models/role';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin_account', component: AdminAccountComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'school_day', component: SchoolDayComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'school_subject', component: SchoolSubjectComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'school_class', component: SchoolClassComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'school_buzzer', component: SchoolBuzzerComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'buzzer_edit/:id', component: BuzzerEditComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'general_schedule', component: GeneralScheduleComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'general_schedule_add', component: SubjectAddComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'general_schedule_edit/:id', component: SubjectEditComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'user_account', component: UserAccountComponent, canActivate: [AuthGuard], data: { expectedRole: Role.User } },
  { path: 'user_schedule', component: UserScheduleComponent, canActivate: [AuthGuard], data: { expectedRole: Role.User } },
  { path: 'about-school', component: AboutSchoolComponent },
  { path: 'about-school_edit/:id', component: AboutSchoolEditComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: ''} // Если адрес не найдет перенаправить на главную
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
