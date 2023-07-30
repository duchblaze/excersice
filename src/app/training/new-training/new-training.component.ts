import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();

  exercises!: Exercise[];
  // exercises!: Observable<Exercise[]>;
  // exercises: Exercise[] = [];
  exerciseSubscription!: Subscription

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }


  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe(exercises => this.exercises = exercises);
    this.trainingService.fetchAvailableExercise();
    // console.log(this.trainingService)
    //  this.exercises = this.db
    //   .collection('availableExercises')
    //    .snapshotChanges().pipe(map(docArray => {
    //      return docArray.map((doc: any) => {
    //        return {
    //          id: doc.payload.doc.id,
    //          name: doc.payload.doc.data().name,
    //          duration: doc.payload.doc.data().duration,
    //          calories: doc.payload.doc.data().calories
    //          ...doc.payload.doc.data()
    //        }
    //      })
    //    }))
      //  .subscribe((result: any) => {
      //  console.log(result)
      // })

    // this.db.collection('availableExercises').valueChanges().subscribe(result => {
    //   console.log(result)
    // })
    // this.exercises = this.trainingService.getAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit()
    this.trainingService.startExercise(form.value.exercise)
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe()
  }
}
