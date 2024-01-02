import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ResumeComponent} from "./components/resume/resume.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  //{path:"",component:HeaderComponent},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"resume",component:ResumeComponent},
  {path:"projects",component:ProjectsComponent},
  {path:"login",component:LoginComponent}
  //{path:"**",component:HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
