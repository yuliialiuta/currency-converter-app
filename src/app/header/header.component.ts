import { Component, OnInit } from '@angular/core';
import { Header } from '../header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  header: Header = {
    text: '1 Українська гривна дорівнює',
    currency: '0,032 Євро',
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
  constructor() {}

  ngOnInit(): void {}
}
