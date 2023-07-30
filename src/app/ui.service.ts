import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, Subscription } from "rxjs";
import { Observable } from "rxjs-compat";


@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(message: string, action: string | undefined, duration: any) {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
}
