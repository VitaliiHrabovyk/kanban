import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { Board } from 'src/app/shared/board.model';

import {
  trigger,
  state,
  style,
  animate,
  transition,

} from '@angular/animations';

@Component({
  selector: 'app-main-view',
  animations: [
    trigger('fadeAway', [

      state('visible', style({
      })),
      state('unvisible', style({
        "font-size": "0px",
        width: "10px"
      })),
      transition('visible => unvisible', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],

  
})
export class MainViewComponent implements OnInit {

  

  constructor(
    private fbService: FirebaseService,
  ) { }



  form!:FormGroup;
  boardFromFireBase$:any;

  ngOnInit(): void {
    this.form = new FormGroup ({
      idea: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
    
    this.fbService.getFromFireBase().subscribe(res => {
      this.boardFromFireBase$ = res;

      if(this.boardFromFireBase$.ideas){
        this.boardFromFireBase$.ideas.forEach((element:string) => {
          this.ideas.push(element)
        });
      }
      if(this.boardFromFireBase$.reserch){
        this.boardFromFireBase$.reserch.forEach((element:string) => {
          this.reserch.push(element)
        });
      }
      if(this.boardFromFireBase$.todo){
        this.boardFromFireBase$.todo.forEach((element:string) => {
          this.todo.push(element)
        });
      }
      if(this.boardFromFireBase$.done){
        this.boardFromFireBase$.done.forEach((element:string) => {
          this.done.push(element)
        });
      }

    })
    
  }

  ideas:string[] = [];
  reserch:string[]= [];
  todo: string[] = [];
  done:string[] = [];
  trash:string[] = [];

  board:Board = {
    ideas: this.ideas,
    reserch: this.reserch,
    todo: this.todo,
    done: this.done
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.fbService.saveToFireBase(this.board)
    if(this.trash.length) {
      setTimeout(() => {
        this.trash.length = 0;
        console.log("delete");
      }, 1000);
  
    }
    
  }


  addToggle = false;

  submit() {


    this.ideas.push(this.form.value.idea);
    this.form.reset();
    this.addToggle = false;
    console.log(this.board);
    this.fbService.saveToFireBase(this.board)
        
  }

}
