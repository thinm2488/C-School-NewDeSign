import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { ExcelService } from './service/excel.service';
import {NotificationService} from './service/notification.service';
import {TranscriptService}  from './service/transcript.service'

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NotificationComponent } from './notification/notification.component';
import { DayoffComponent } from './dayoff/dayoff.component';
import { TranscriptComponent } from './transcript/transcript.component';
import { FulltranscriptComponent } from './fulltranscript/fulltranscript.component';
import { ScheduleComponent } from './schedule/schedule.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatSelectModule,
    NgbModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    // ScheduleComponent,
    // FulltranscriptComponent,
    // TranscriptComponent,
   
    
  
    
    

  ],
  providers: [
    ApiService,
    CookieService,
    ExcelService,
    NotificationService,
    TranscriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
