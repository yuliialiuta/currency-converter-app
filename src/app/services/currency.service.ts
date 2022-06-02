import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyData } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrencyData(): Observable<CurrencyData> {
    return this.http.get<CurrencyData>(
      `/p24api/exchange_rates?json&date=${new Date().toLocaleDateString('uk')}`
    );
  }
}
