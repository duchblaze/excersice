import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UIService } from "../ui.service";

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private uiService: UIService
  ) { }

  registerUser(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(authData.email.trim(), authData.password)
      .then((userCredential) => {
        this.uiService.loadingStateChanged.next(false);
        this.authSuccessfully();
        this.router.navigate(['/login']);
        // console.log(userCredential);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, "OK", 5000)
          //  this.snackBar.open(error.message, "Ok", { duration: 5000})
      });


    // this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
    //   this.authSuccessfully();
    //   console.log(result)
    // })
    //   .catch(error => {
    //     console.log(error)
    //   });



    // this.authSuccessfully();
    // this.authChange.next(true);
    // this.router.navigate(['/training']);
  }

  login(authData: AuthData) {
    // console.log('User logged in successfully:', authData);
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result)
        this.uiService.loadingStateChanged.next(false);
        this.authSuccessfully();
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, "OK", 5000)
        // this.snackBar.open(error.message, "Ok", { duration: 5000})
    })

    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    // this.authSuccessfully();
    // this.authChange.next(true);
    // this.router.navigate(['/training']);
  }

  logout() {
    // this.user == null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
    this.isAuthenticated = false;
  }

  // getUser() {
  //   return {...this.user };
  // }

  isAuth() {
    return this.isAuthenticated
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
