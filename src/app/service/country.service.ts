import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getAllCountrys():Observable<any[]>{
    return this.http.get<any[]>('https://restcountries.com/v3.1/all');
  }
}
