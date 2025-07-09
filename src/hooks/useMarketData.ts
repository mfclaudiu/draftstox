import { useState, useEffect } from 'react';
import { MarketData } from '../types';
import { marketDataService, MarketDataResponse } from '../services/marketData';

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