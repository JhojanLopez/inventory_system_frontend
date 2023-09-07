import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private usersService: UsersService, private router: Router){}
  user: User;
  
  ngOnInit(): void {
    if(this.usersService.isUserLogged()){
      this.user = this.usersService.getUserLogged();
    }
  }
  logout(){
    this.usersService.logout();
    this.router.navigate(['/users']);
  }

}
