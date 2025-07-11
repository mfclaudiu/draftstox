import { MarketData } from '../types';

// API Configuration
const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'IYO1SVB4RLCUX2CZ';
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Yahoo Finance Alternative API (free tier)
const YAHOO_FINANCE_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

// Rate limiting configuration
const MAX_REQUESTS_PER_MINUTE = 5;
const requestTimestamps: number[] = [];

export interface MarketDataResponse {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  name: string;
  timestamp: number;
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen?: string;
  marketClose?: string;
  timezone: string;
  currency: string;
  matchScore: number;
}

class MarketDataService {
  private cache: Map<string, { data: MarketDataResponse; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
  private isRateLimited = false;
  private rateLimitResetTime: number = 0;

  // Check rate limiting
  private checkRateLimit(): boolean {
    const now = Date.now();
    // Remove timestamps older than 1 minute
    while (requestTimestamps.length > 0 && requestTimestamps[0] < now - 60000) {
      requestTimestamps.shift();
    }
    
    if (requestTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
      this.isRateLimited = true;
      this.rateLimitResetTime = requestTimestamps[0] + 60000;
      return false;
    }

    requestTimestamps.push(now);
    return true;
  }

  // Get current price data for a symbol
  async getCurrentPrice(symbol: string): Promise<MarketDataResponse | null> {
    try {
      // Check cache first
      const cached = this.getCachedData(symbol);
      if (cached) return cached;

      // Check rate limiting
      if (!this.checkRateLimit()) {
        console.warn(`Rate limit reached. Try again in ${Math.ceil((this.rateLimitResetTime - Date.now()) / 1000)} seconds`);
        return this.getMockPriceData(symbol);
      }

      // Try Alpha Vantage first, fallback to Yahoo Finance
      let data = await this.fetchFromAlphaVantage(symbol);
      if (!data) {
        console.log('Falling back to Yahoo Finance for', symbol);
        data = await this.fetchFromYahooFinance(symbol);
      }

      if (data) {
        this.setCachedData(symbol, data);
        return data;
      }

      // If both APIs fail, return mock data
      console.warn('Both APIs failed, using mock data for', symbol);
      return this.getMockPriceData(symbol);

    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      return this.getMockPriceData(symbol);
    }
  }

  // Get multiple stock prices
  async getMultiplePrices(symbols: string[]): Promise<MarketDataResponse[]> {
    const promises = symbols.map(symbol => this.getCurrentPrice(symbol));
    const results = await Promise.allSettled(promises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<MarketDataResponse> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
  }

  // Search for stocks by query
  async searchStocks(query: string): Promise<StockSearchResult[]> {
    try {
      if (!ALPHA_VANTAGE_API_KEY) {
        // Fallback to mock data if no API key
        return this.getMockSearchResults(query);
      }

      const url = `${ALPHA_VANTAGE_BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data['Error Message'] || data['Note']) {
        throw new Error(data['Error Message'] || 'API limit reached');
      }

      const results = data['bestMatches'] || [];
      return results.map((item: any) => ({
        symbol: item['1. symbol'],
        name: item['2. name'],
        type: item['3. type'],
        region: item['4. region'],
        marketOpen: item['5. marketOpen'],
        marketClose: item['6. marketClose'],
        timezone: item['7. timezone'],
        currency: item['8. currency'],
        matchScore: parseFloat(item['9. matchScore']),
      }));
    } catch (error) {
      console.error('Error searching stocks:', error);
      return this.getMockSearchResults(query);
    }
  }

  // Get historical data for charts
  async getHistoricalData(symbol: string, period: '1D' | '1W' | '1M' | '3M' | '1Y' = '1M'): Promise<HistoricalDataPoint[]> {
    try {
      if (!ALPHA_VANTAGE_API_KEY) {
        return this.getMockHistoricalData(symbol, period);
      }

      const interval = this.getIntervalForPeriod(period);
      const url = `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_${interval}&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data['Error Message'] || data['Note']) {
        throw new Error(data['Error Message'] || 'API limit reached');
      }

      const timeSeriesKey = Object.keys(data).find(key => key.includes('Time Series'));
      if (!timeSeriesKey) {
        throw new Error('No time series data found');
      }

      const timeSeries = data[timeSeriesKey];
      const points: HistoricalDataPoint[] = [];

      for (const [date, values] of Object.entries(timeSeries)) {
        const point = values as any;
        points.push({
          date,
          open: parseFloat(point['1. open']),
          high: parseFloat(point['2. high']),
          low: parseFloat(point['3. low']),
          close: parseFloat(point['4. close']),
          volume: parseInt(point['5. volume']),
        });
      }

      return points.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      return this.getMockHistoricalData(symbol, period);
    }
  }

  // Private helper methods
  private async fetchFromAlphaVantage(symbol: string): Promise<MarketDataResponse | null> {
    if (!ALPHA_VANTAGE_API_KEY) return null;

    try {
      const url = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data['Error Message'] || data['Note']) {
        console.warn('Alpha Vantage warning:', data['Error Message'] || data['Note']);
        return null;
      }

      const quote = data['Global Quote'];
      if (!quote || !quote['05. price']) {
        console.warn('Invalid Alpha Vantage response for symbol:', symbol);
        return null;
      }

      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change'] || '0'),
        changePercent: parseFloat((quote['10. change percent'] || '0%').replace('%', '')),
        volume: parseInt(quote['06. volume'] || '0'),
        name: symbol,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Alpha Vantage error:', error);
      return null;
    }
  }

  private async fetchFromYahooFinance(symbol: string): Promise<MarketDataResponse | null> {
    try {
      const url = `${YAHOO_FINANCE_BASE_URL}/${symbol}?interval=1d&range=1d`;
      const response = await fetch(url);
      const data = await response.json();

      const result = data.chart?.result?.[0];
      if (!result?.meta || !result.meta.regularMarketPrice) {
        console.warn('Invalid Yahoo Finance response for symbol:', symbol);
        return null;
      }

      const meta = result.meta;
      const timestamp = meta.regularMarketTime * 1000;
      const previousClose = meta.chartPreviousClose;
      const currentPrice = meta.regularMarketPrice;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      return {
        symbol: meta.symbol,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        volume: meta.regularMarketVolume || 0,
        name: meta.symbol,
        timestamp: timestamp,
      };
    } catch (error) {
      console.error('Yahoo Finance error:', error);
      return null;
    }
  }

  private getCachedData(symbol: string): MarketDataResponse | null {
    const cached = this.cache.get(symbol.toUpperCase());
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(symbol: string, data: MarketDataResponse): void {
    this.cache.set(symbol.toUpperCase(), {
      data,
      timestamp: Date.now(),
    });
  }

  private getIntervalForPeriod(period: string): string {
    switch (period) {
      case '1D': return 'INTRADAY&interval=15min';
      case '1W': return 'DAILY';
      case '1M': return 'DAILY';
      case '3M': return 'WEEKLY';
      case '1Y': return 'MONTHLY';
      default: return 'DAILY';
    }
  }

  // Mock data for development/fallback
  private getMockSearchResults(query: string): StockSearchResult[] {
    const mockStocks = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'TSLA', name: 'Tesla Inc.' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation' },
      { symbol: 'META', name: 'Meta Platforms Inc.' },
      { symbol: 'NFLX', name: 'Netflix Inc.' },
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust' },
      { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
    ];

    const filtered = mockStocks.filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.map(stock => ({
      symbol: stock.symbol,
      name: stock.name,
      type: 'Equity',
      region: 'United States',
      timezone: 'UTC-04',
      currency: 'USD',
      matchScore: 1.0,
    }));
  }

  private getMockHistoricalData(symbol: string, period: string): HistoricalDataPoint[] {
    const days = this.getDaysForPeriod(period);
    const basePrice = 100 + Math.random() * 400; // Random base price between 100-500
    const points: HistoricalDataPoint[] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      const volatility = 0.02; // 2% daily volatility
      const change = (Math.random() - 0.5) * 2 * volatility;
      const price = i === 0 ? basePrice : points[i - 1].close * (1 + change);
      
      const high = price * (1 + Math.random() * 0.01);
      const low = price * (1 - Math.random() * 0.01);
      const open = i === 0 ? price : points[i - 1].close;

      points.push({
        date: date.toISOString().split('T')[0],
        open,
        high,
        low,
        close: price,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
      });
    }

    return points;
  }

  private getDaysForPeriod(period: string): number {
    switch (period) {
      case '1D': return 1;
      case '1W': return 7;
      case '1M': return 30;
      case '3M': return 90;
      case '1Y': return 365;
      default: return 30;
    }
  }

  // Mock price data generator
  private getMockPriceData(symbol: string): MarketDataResponse {
    const basePrice = this.getBasePrice(symbol);
    const change = (Math.random() * 4) - 2; // Random change between -2% and +2%
    const price = basePrice * (1 + change / 100);
    
    return {
      symbol,
      price,
      change: basePrice * (change / 100),
      changePercent: change,
      volume: Math.floor(Math.random() * 1000000) + 500000,
      name: symbol,
      timestamp: Date.now()
    };
  }

  // Get base price for mock data
  private getBasePrice(symbol: string): number {
    const prices: { [key: string]: number } = {
      'AAPL': 170.25,
      'MSFT': 330.50,
      'GOOGL': 130.75,
      'AMZN': 145.20,
      'META': 275.80,
      'TSLA': 180.50,
      'NVDA': 420.30,
      'JPM': 140.90,
      'V': 250.40,
      'WMT': 160.70
    };
    return prices[symbol] || 100.00;
  }

  // Utility method to convert to MarketData interface
  toMarketData(response: MarketDataResponse): MarketData {
    return {
      symbol: response.symbol,
      name: response.name,
      price: response.price,
      change: response.change,
      changePercent: response.changePercent,
      volume: response.volume,
      marketCap: response.marketCap,
    };
  }

  // Get popular stocks
  getPopularStocks(): string[] {
    return ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'V', 'WMT'];
  }

  // Get market indices
  getMarketIndices(): string[] {
    return ['^GSPC', '^DJI', '^IXIC', '^RUT'];
  }
}

export const marketDataService = new MarketDataService(); 