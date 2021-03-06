import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/teacher', title: 'Quản lý tài khoản GV',  icon:'content_paste', class: '' },
    { path: '/user', title: 'Quản Lý Tài Khoản',  icon:'person', class: '' },
    { path: '/student', title: 'Quản Lý Học Sinh',  icon:'people', class: '' },
    { path: '/notification', title: 'Quản Lý Thông Báo',  icon:'notifications', class: '' },
    { path: '/dayoff', title: 'Xét Duyệt Xin Phép',  icon:'calendar_today', class: '' },
    { path: '/transcript', title: 'Quản Lý Điểm',  icon:'assignment', class: '' },
    { path: '/transcriptdetail', title: 'Quản Lớp Chủ Nhiệm',  icon:'assignment', class: '' },
    { path: '/schedule', title: 'Thời Khóa Biểu',  icon:'calendar_today', class: '' },


   
    
  
   
   


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
