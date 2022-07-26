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
    NotesDashboardComponent
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
