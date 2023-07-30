import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, timestamp } from 'rxjs/operators';
import { Injectable } from "@angular/core";


@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [
      // { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
      // { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
      // { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
      // { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: Exercise | undefined | any;
  // private runningExercise: Exercise | undefined | any;
  private exercises: Exercise[] = [];
  // private finishedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) { }

  fetchAvailableExercise() {

    this.db
      .collection('availableExercises')
       .snapshotChanges().pipe(map(docArray => {
         return docArray.map((doc: any) => {
           return {
             id: doc.payload.doc.id,
             name: doc.payload.doc.data().name,
             duration: doc.payload.doc.data().duration,
             calories: doc.payload.doc.data().calories
            //  timestamp: doc.payload.doc.data().timestamp
            //  ...doc.payload.doc.data()
           }
         })
       }))
      .subscribe((exercises: Exercise[]) => {
        // console.log(exercises)
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises])
       })
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId) as Exercise;
    // this.runningExercise = selectedExercise
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return {...this.runningExercise}
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise as Exercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null as any)
  }


  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise as Exercise,
      duration: this.runningExercise.duration  * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
  });
  this.runningExercise = null;
  this.exerciseChanged.next(null as any);

  }

  fetchCompletedOrCancelledExercises() {
    this.db.collection('finishedExercises')
      .valueChanges({ idField: 'id' }) // Add 'idField' option to get document IDs
      .subscribe((exercisesData: any[]) => {
        const exercises: Exercise[] = exercisesData.map((exerciseData: any) => {
          // Convert Timestamp fields to JavaScript Date objects
          return {
            ...exerciseData,
            date: exerciseData.date.toDate(), // Assuming 'date' is the field containing the Timestamp
          };
        });
        this.finishedExercisesChanged.next(exercises);
      });
  }


  //this stores the data in the database
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }
}
