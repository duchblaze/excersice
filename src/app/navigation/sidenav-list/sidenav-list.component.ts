import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

  @Output() closenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus
    })
  }


  onClose() {
    this.closenav.emit()
  }


  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

}



