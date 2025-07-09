import { useState, useEffect } from 'react';
import { MarketData } from '../types';
import { MarketDataResponse } from '../services/marketData';

// Create a singleton instance of the market data service
const marketDataService = {
  getMultiplePrices: async (symbols: string[]): Promise<MarketDataResponse[]> => {
    // Mock implementation
    return symbols.map(symbol => ({
      symbol,
      name: symbol,
      price: Math.random() * 1000,
      change: Math.random() * 10 - 5,
      changePercent: Math.random() * 5 - 2.5,
      volume: Math.floor(Math.random() * 1000000),
      timestamp: Date.now()
    }));
  },
  toMarketData: (response: MarketDataResponse): MarketData => ({
    symbol: response.symbol,
    price: response.price,
    change: response.change,
    changePercent: response.changePercent,
    volume: response.volume || 0,
    timestamp: new Date(response.timestamp).toISOString()
  })
};

export function useMarketData(symbols: string[]) {
  const [data, setData] = useState<Record<string, MarketData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    async function fetchData() {
      try {
        const responses = await marketDataService.getMultiplePrices(symbols);
        if (!mounted) return;

        const newData: Record<string, MarketData> = {};
        responses.forEach(response => {
          if (response) {
            newData[response.symbol] = marketDataService.toMarketData(response);
          }
        });

        setData(newData);
        setLoading(false);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch market data');
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [symbols.join(',')]);

  return { data, loading, error };
} 