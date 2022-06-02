import { Component } from '@angular/core';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent {
  currency = ['UAH', 'USD', 'EUR'];

  selectedFrom: string = 'UAH';
  selectedTo: string = 'EUR';
}
