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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
