import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers:[AuthService],
})
export class SidebarComponent implements OnInit {
public isLogged = false;
public user:any;

  currentUrl: string;

  constructor(private router: Router, public auth: AuthService, private authSvc: AuthService) {
    router.events.subscribe((_: NavigationEnd) => {this.currentUrl = this.router.url});
   }

  async ngOnInit() {
    console.log('sidebar');
    this.user = await this.authSvc.getCurrentUser();
    if (this.user){
      this.isLogged = true;
      console.log('User =>', true);
    }
  }

  async onLogout(){
  try{
    await this.authSvc.logout();
    this.router.navigate(['/login']);
  }catch (error){
    console.log(error);
  }
  }

  refresh(): void { 
    window.location.reload();
  }


}
