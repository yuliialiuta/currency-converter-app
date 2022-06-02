import { Component } from '@angular/core';

import { CurrencyData, CurrencyRate } from '../models/currency';
import { CurrencyService } from '../services/currency.service';
import { AppService, AppServiceData } from '../services/app.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent {
  currency = ['UAH', 'USD', 'EUR'];

  valueFrom: number = 0;
  valueTo: number = 0;

  selectedFrom: string = 'UAH';
  selectedTo: string = 'EUR';

  currencyData?: CurrencyData;

  isNotLoaded: boolean = true;

  constructor(
    private currencyService: CurrencyService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.currencyService
      .getCurrencyData()
      .subscribe((currencyData: CurrencyData) => {
        console.log('Convert is loaded!');
        this.isNotLoaded = false;
        this.currencyData = currencyData;
      });
  }

  emitSelectedCurrencies(): void {
    const data: AppServiceData = {
      currencyFrom: this.selectedFrom,
      currencyTo: this.selectedTo,
    };
    this.appService.emitSelectedCurrencies(data);
  }

  onSelectFromChanged(_currency: string): void {
    this.emitSelectedCurrencies();
    this.valueTo = this.valueFrom * this.calculateRatio();
  }

  onSelectToChanged(_currency: string): void {
    this.emitSelectedCurrencies();
    this.valueFrom = this.valueTo / this.calculateRatio();
  }

  calculateRatio(): number {
    if (this.currencyData === undefined) {
      return 1;
    }

    const selectedCurrencyFrom = this.currencyData.exchangeRate.find(
      (value: CurrencyRate) => value.currency === this.selectedFrom
    );

    const selectedCurrencyTo = this.currencyData.exchangeRate.find(
      (value: CurrencyRate) => value.currency === this.selectedTo
    );

    if (
      selectedCurrencyFrom === undefined ||
      selectedCurrencyTo === undefined
    ) {
      return 1;
    }

    return selectedCurrencyFrom.saleRateNB / selectedCurrencyTo.saleRateNB;
  }

  onInputFromChanged(_value: Event): void {
    this.valueTo = this.valueFrom * this.calculateRatio();
  }

  onInputToChanged(_value: Event): void {
    this.valueFrom = this.valueTo / this.calculateRatio();
  }
}
