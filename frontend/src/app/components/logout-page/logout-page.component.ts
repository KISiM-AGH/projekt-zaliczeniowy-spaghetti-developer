import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services';

@Component({
  selector: 'logout-page',
  template: ` <div>Wylogwywanie...</div>`,
})
export class LogoutPageComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  public ngOnInit(): void {
    this.userService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
