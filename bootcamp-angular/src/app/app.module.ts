import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeComponent} from './page/employee/employee.component';
import {SkillComponent} from './page/skill/skill.component';
import {TeamComponent} from './page/team/team.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http"
import {MatTableModule} from "@angular/material/table";
import {SkillEditComponent} from './page/skill/skill-edit/skill-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeleteDialogComponent} from './ui/delete-dialog/delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {HeaderComponent} from './ui/header/header.component';
import {HomeComponent} from './page/home/home.component';
import {TeamEditComponent} from './page/team/team-edit/team-edit.component';
import {EmployeeEditComponent} from './page/employee/employee-edit/employee-edit.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SkillComponent,
    TeamComponent,
    SkillEditComponent,
    DeleteDialogComponent,
    HeaderComponent,
    HomeComponent,
    TeamEditComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
