import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NonloggedStateComponent } from './components/nonlogged-state/nonlogged-state.component';
import { LoggedStateComponent } from './components/logged-state/logged-state.component';
import { LoginFormComponent } from './components/nonlogged-state/login-form/login-form.component';
import { RegisterFormComponent } from './components/nonlogged-state/register-form/register-form.component';
import { ProfileDashboardComponent } from './components/logged-state/profile-dashboard/profile-dashboard.component';
import { CalendarDashboardComponent } from './components/logged-state/calendar-dashboard/calendar-dashboard.component';
import { NotesDashboardComponent } from './components/logged-state/notes-dashboard/notes-dashboard.component';
import { MoneyDashboardComponent } from './components/logged-state/money-dashboard/money-dashboard.component';
import { DatesDashboardComponent } from './components/logged-state/dates-dashboard/dates-dashboard.component';
import { MoneyFormComponent } from './components/logged-state/money-dashboard/money-form/money-form.component';
import { DatesFormComponent } from './components/logged-state/dates-dashboard/dates-form/dates-form.component';
import { NotesFormComponent } from './components/logged-state/notes-dashboard/notes-form/notes-form.component';
import { MoneyOperationComponent } from './components/logged-state/money-dashboard/money-operation/money-operation.component';
import { DateDisplayComponent } from './components/logged-state/dates-dashboard/date-display/date-display.component';
import { InfoPopupComponent } from './components/logged-state/info-popup/info-popup.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NonloggedStateComponent,
    LoggedStateComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileDashboardComponent,
    CalendarDashboardComponent,
    NotesDashboardComponent,
    MoneyDashboardComponent,
    DatesDashboardComponent,
    MoneyFormComponent,
    DatesFormComponent,
    NotesFormComponent,
    MoneyOperationComponent,
    DateDisplayComponent,
    InfoPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
