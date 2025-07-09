import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, X } from 'lucide-react';
import { marketDataService, StockSearchResult } from '../services/marketData';

interface StockSearchProps {
  onSelectStock: (stock: StockSearchResult) => void;
  placeholder?: string;
  className?: string;
}

export function StockSearch({ onSelectStock, placeholder = "Search stocks...", className = "" }: StockSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [popularStocks, setPopularStocks] = useState<StockSearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load popular stocks on mount
  useEffect(() => {
    loadPopularStocks();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search for stocks with debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchResults = await marketDataService.searchStocks(query);
        setResults(searchResults.slice(0, 10)); // Limit to 10 results
      } catch (error) {
        console.error('Error searching stocks:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const loadPopularStocks = async () => {
    try {
      const popular = marketDataService.getPopularStocks();
      const stockData = await Promise.all(
        popular.slice(0, 6).map(async (symbol) => ({
          symbol,
          name: symbol,
          type: 'Equity',
          region: 'United States',
          timezone: 'UTC-04',
          currency: 'USD',
          matchScore: 1.0,
        }))
      );
      setPopularStocks(stockData);
    } catch (error) {
      console.error('Error loading popular stocks:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
  };

  const handleSelectStock = (stock: StockSearchResult) => {
    onSelectStock(stock);
    setQuery('');
    setIsOpen(false);
    setResults([]);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const displayResults = query.trim() ? results : popularStocks;
  const showResults = isOpen && (displayResults.length > 0 || isLoading);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   bg-white text-gray-900 placeholder-gray-500
                   transition-colors duration-200"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {!query.trim() && (
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Popular Stocks
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="px-4 py-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Searching...</p>
            </div>
          ) : displayResults.length > 0 ? (
            <div className="py-2">
              {displayResults.map((stock, index) => (
                <button
                  key={`${stock.symbol}-${index}`}
                  onClick={() => handleSelectStock(stock)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 
                           focus:outline-none transition-colors duration-150 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {stock.symbol}
                        </span>
                        {stock.type && (
                          <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {stock.type}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {stock.name}
                      </p>
                      {stock.region && (
                        <p className="text-xs text-gray-500 mt-1">
                          {stock.region} • {stock.currency}
                        </p>
                      )}
                    </div>
                    
                    {stock.matchScore && query.trim() && (
                      <div className="ml-4 text-xs text-gray-400">
                        {Math.round(stock.matchScore * 100)}% match
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() && !isLoading ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No stocks found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching for a ticker symbol or company name
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
} 