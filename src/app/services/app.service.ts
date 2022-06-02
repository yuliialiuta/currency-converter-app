import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface AppServiceData {
  currencyFrom: string;
  currencyTo: string;
}

@Injectable({
  providedIn: 'root',
})
class AppService {
  observer = new Subject<AppServiceData>();
  public subscriber$ = this.observer.asObservable();

  emitSelectedCurrencies(data: AppServiceData) {
    this.observer.next(data);
  }
}

export { AppServiceData, AppService };
