import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';


import { TeacherComponent } from '../../teacher/teacher.component';
import { StudentComponent } from '../../student/student.component';
import { NotificationComponent } from '../../notification/notification.component';
import { DayoffComponent } from '../../dayoff/dayoff.component';
import { TranscriptComponent } from '../../transcript/transcript.component';
import { FulltranscriptComponent } from '../../fulltranscript/fulltranscript.component';
import { ScheduleComponent } from '../../schedule/schedule.component';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'student',      component: StudentComponent },
    { path: 'teacher',      component: TeacherComponent },
    { path: 'user',   component: UserProfileComponent },
    { path: 'notification',  component: NotificationComponent },
    { path: 'dayoff',  component: DayoffComponent },
    { path: 'transcript',  component: TranscriptComponent },
    { path: 'transcriptdetail',     component: FulltranscriptComponent },
    { path: 'schedule',     component: ScheduleComponent },

    // { path: 'notifications',  component: NotificationsComponent },
  
];
