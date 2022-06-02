interface CurrencyRate {
  baseCurrency: string;
  currency: string;
  saleRateNB: number;
  purchaseRateNB: number;
  saleRate?: number;
  purchaseRate?: number;
}

interface CurrencyData {
  date: string;
  bank: string;
  baseCurrency: number;
  baseCurrencyLit: string;
  exchangeRate: CurrencyRate[];
}

export { CurrencyData, CurrencyRate };
