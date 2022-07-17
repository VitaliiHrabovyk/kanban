import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from './board.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  
  getFromFireBase(){
    return this.http.get(`${environment.fbLink}/board.json`)
  }

  saveToFireBase(board:Board){
    this.http.put(`${environment.fbLink}/board.json`, board).subscribe(res => console.log(res)
    )
    
    
  }

}
