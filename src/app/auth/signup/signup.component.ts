import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UIService } from 'src/app/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {


  maxDate: any;
  isLoading = false;
  loadingSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    // console.log(form)
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    // this.router.navigate(['/login'])
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }
}
