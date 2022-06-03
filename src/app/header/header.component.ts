import { Component, OnInit } from '@angular/core';
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

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.subscriber$.subscribe((data: AppServiceData) => {
      this.onCurrencyUpdated(data);
    });
  }

  onCurrencyUpdated(data: AppServiceData): void {
    const currencyFrom = this.currencies.get(data.currencyFrom);
    const currencyTo = this.currencies.get(data.currencyTo);

    this.header.currency = `1 ${currencyFrom} дорівнює ${data.ratio.toFixed(
      3
    )} ${currencyTo}`;
  }
}
