import { CurrencyData } from './currency';

export interface Header {
  text: string;
  currency: string;
  currencyData?: CurrencyData;
}
