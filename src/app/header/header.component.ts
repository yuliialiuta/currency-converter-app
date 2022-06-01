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
    date: '1 червня,',
    time: '12.54 UTC',
  };

  constructor() {}

  ngOnInit(): void {}
}
