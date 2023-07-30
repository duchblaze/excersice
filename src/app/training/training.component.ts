import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {


  exerciseSubscription: Subscription | undefined | null;
  ongoingTraing = false;

  constructor (private trainingService: TrainingService) {}


  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if (exercise) {
        this.ongoingTraing = true;
      } else {
        this.ongoingTraing = false;
      }
   })
  }
}
