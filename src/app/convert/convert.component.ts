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
  currenciesRatio: number = 1;

  constructor(
    private currencyService: CurrencyService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.currencyService
      .getCurrencyData()
      .subscribe((currencyData: CurrencyData) => {
        this.currencyData = currencyData;

        this.updateCurrenciesRatio();
        this.emitSelectedCurrencies();

        this.isNotLoaded = false;
      });
  }

  emitSelectedCurrencies(): void {
    const data: AppServiceData = {
      currencyFrom: this.selectedFrom,
      currencyTo: this.selectedTo,
      ratio: this.currenciesRatio,
    };
    this.appService.emitSelectedCurrencies(data);
  }

  onSelectFromChanged(_currency: string): void {
    this.updateCurrenciesRatio();
    this.emitSelectedCurrencies();
    this.valueTo = this.valueFrom * this.currenciesRatio;
  }

  onSelectToChanged(_currency: string): void {
    this.updateCurrenciesRatio();
    this.emitSelectedCurrencies();
    this.valueFrom = this.valueTo / this.currenciesRatio;
  }

  updateCurrenciesRatio(): void {
    if (this.currencyData === undefined) {
      this.currenciesRatio = 1;
      return;
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
      this.currenciesRatio = 1;
      return;
    }

    this.currenciesRatio =
      selectedCurrencyFrom.saleRateNB / selectedCurrencyTo.saleRateNB;
  }

  onInputFromChanged(_value: Event): void {
    this.valueTo = this.valueFrom * this.currenciesRatio;
  }

  onInputToChanged(_value: Event): void {
    this.valueFrom = this.valueTo / this.currenciesRatio;
  }
}
