import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutMeComponent } from './components/about/about-me/about-me.component';
import { SkillsComponent } from './components/about/skills/skills.component';
import { TestimonialsComponent } from './components/about/testimonials/testimonials.component';
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { EducationComponent } from './components/resume/education/education.component';
import { ExperienceComponent } from './components/resume/experience/experience.component';
import { SummaryComponent } from './components/resume/summary/summary.component';
import { CoursesComponent } from './components/resume/courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { AuthService } from './service/auth.service';
import { CrudButtonsComponent } from './components/crud-buttons/crud-buttons.component';
import { DialogModule } from 'primeng/dialog';
import { AddCourseComponent } from './components/modals/add-course/add-course.component';
import { AddExperienceComponent } from './components/modals/add-experience/add-experience.component';
import { AddEducationComponent } from './components/modals/add-education/add-education.component';
import { DialogService } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    AboutComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    AboutMeComponent,
    SkillsComponent,
    TestimonialsComponent,
    EducationComponent,
    ExperienceComponent,
    SummaryComponent,
    CoursesComponent,
    LoginComponent,
    CrudButtonsComponent,
    AddCourseComponent,
    AddExperienceComponent,
    AddEducationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [TokenInterceptorService,AuthService,DialogService],
  bootstrap: [AppComponent],
})
export class AppModule { }
