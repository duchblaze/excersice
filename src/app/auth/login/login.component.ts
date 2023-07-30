import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  private loadingSubs!: Subscription;
  // form!: any;


  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', {
       validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
       })
   })
  }



  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email.trim(),
      password: this.loginForm.value.password.trim()
    })
    // console.log(form.value)
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }
}
