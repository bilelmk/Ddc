import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {

  constructor(private authService : AuthService , private location : Location , private router : Router) {}

  logout() {
    this.authService.logout()
  }

  back() {
    if(this.router.url != "/home/modules") {
      this.location.back() ;
    }
  }
}
