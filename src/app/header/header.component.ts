import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { CurrencyData, CurrencyRate } from '../models/currency';
import { Header } from '../models/header';
import { AppService, AppServiceData } from '../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currencies = new Map<string, string>([
    ['USD', 'Долар'],
    ['EUR', 'Євро'],
    ['UAH', 'Гривня'],
  ]);

  header: Header = {
    text: '',
    currency: '',
  };

  getCurrentDateTime(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };

    return currentDate.toLocaleString('uk', options);
  }

  constructor(
    private currencyService: CurrencyService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.appService.subscriber$.subscribe((data: AppServiceData) => {
      this.onCurrencyUpdated(data);
    });

    this.currencyService
      .getCurrencyData()
      .subscribe((currencyData: CurrencyData) => {
        console.log('Header is loaded!');
        this.header.currencyData = currencyData;

        const defaultCurrencies: AppServiceData = {
          currencyFrom: 'UAH',
          currencyTo: 'EUR',
        };
        this.onCurrencyUpdated(defaultCurrencies);
      });
  }

  onCurrencyUpdated(data: AppServiceData): void {
    if (this.header.currencyData === undefined) {
      return;
    }

    const selectedCurrencyFrom = this.header.currencyData.exchangeRate.find(
      (value: CurrencyRate) => value.currency === data.currencyFrom
    );

    const selectedCurrencyTo = this.header.currencyData.exchangeRate.find(
      (value: CurrencyRate) => value.currency === data.currencyTo
    );

    if (
      selectedCurrencyFrom === undefined ||
      selectedCurrencyTo === undefined
    ) {
      return;
    }

    const currencyFrom = this.currencies.get(data.currencyFrom);
    const currencyTo = this.currencies.get(data.currencyTo);

    const result =
      selectedCurrencyFrom.saleRateNB / selectedCurrencyTo.saleRateNB;

    this.header.currency = `1 ${currencyFrom} дорівнює ${result.toFixed(
      3
    )} ${currencyTo}`;
  }
}
