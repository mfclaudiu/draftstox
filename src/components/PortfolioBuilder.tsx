import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, X, AlertCircle } from 'lucide-react';
import { StockSearch } from './StockSearch';
import { marketDataService, StockSearchResult, MarketDataResponse } from '../services/marketData';
import { Position, Portfolio } from '../types';

interface PortfolioBuilderProps {
  portfolio: Portfolio;
  onUpdatePortfolio: (portfolio: Portfolio) => void;
  onAddPosition: (position: Position) => void;
  onRemovePosition: (positionId: string) => void;
}

interface TradeModalData {
  stock: StockSearchResult;
  action: 'buy' | 'sell';
  maxQuantity?: number;
}

export function PortfolioBuilder({ 
  portfolio, 
  onUpdatePortfolio, 
  onAddPosition, 
  onRemovePosition 
}: PortfolioBuilderProps) {
  const [showAddStock, setShowAddStock] = useState(false);
  const [tradeModal, setTradeModal] = useState<TradeModalData | null>(null);
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [marketData, setMarketData] = useState<Record<string, MarketDataResponse>>({});

  // Update market data for positions
  useEffect(() => {
    updateMarketData();
    const interval = setInterval(updateMarketData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [portfolio.positions]);

  const updateMarketData = async () => {
    if (portfolio.positions.length === 0) return;

    try {
      const symbols = portfolio.positions.map(p => p.symbol);
      const data = await marketDataService.getMultiplePrices(symbols);
      
      const dataMap: Record<string, MarketDataResponse> = {};
      data.forEach(item => {
        dataMap[item.symbol] = item;
      });
      
      setMarketData(dataMap);
    } catch (error) {
      console.error('Error updating market data:', error);
    }
  };

  const handleSelectStock = async (stock: StockSearchResult) => {
    setError('');
    
    // Check if stock already exists in portfolio
    const existingPosition = portfolio.positions.find(p => p.symbol === stock.symbol);
    
    if (existingPosition) {
      setTradeModal({
        stock,
        action: 'buy', // Default to buy, user can change
        maxQuantity: undefined
      });
    } else {
      setTradeModal({
        stock,
        action: 'buy',
        maxQuantity: undefined
      });
    }
    
    setShowAddStock(false);
  };

  const handleTrade = async () => {
    if (!tradeModal || !quantity) return;

    setIsLoading(true);
    setError('');

    try {
      // Get current price
      const priceData = await marketDataService.getCurrentPrice(tradeModal.stock.symbol);
      if (!priceData) {
        throw new Error('Unable to get current price');
      }

      const tradeQuantity = parseFloat(quantity);
      const totalCost = tradeQuantity * priceData.price;

      if (tradeModal.action === 'buy') {
        // Check if user has enough balance
        if (totalCost > portfolio.virtualBalance) {
          throw new Error('Insufficient balance');
        }

        // Check if position already exists
        const existingPosition = portfolio.positions.find(p => p.symbol === tradeModal.stock.symbol);
        
        if (existingPosition) {
          // Update existing position
          const newQuantity = existingPosition.quantity + tradeQuantity;
          const newAveragePrice = (
            (existingPosition.averagePrice * existingPosition.quantity) + 
            (priceData.price * tradeQuantity)
          ) / newQuantity;

          const updatedPosition: Position = {
            ...existingPosition,
            quantity: newQuantity,
            averagePrice: newAveragePrice,
            currentPrice: priceData.price,
            totalValue: newQuantity * priceData.price,
            totalReturn: (priceData.price - newAveragePrice) * newQuantity,
            totalReturnPercent: ((priceData.price - newAveragePrice) / newAveragePrice) * 100,
          };

          // Update portfolio
          const updatedPositions = portfolio.positions.map(p => 
            p.id === existingPosition.id ? updatedPosition : p
          );
          
          const newPortfolio = {
            ...portfolio,
            positions: updatedPositions,
            virtualBalance: portfolio.virtualBalance - totalCost,
          };

          onUpdatePortfolio(newPortfolio);
        } else {
          // Create new position
          const newPosition: Position = {
            id: `${tradeModal.stock.symbol}-${Date.now()}`,
            symbol: tradeModal.stock.symbol,
            name: tradeModal.stock.name,
            quantity: tradeQuantity,
            averagePrice: priceData.price,
            currentPrice: priceData.price,
            totalValue: totalCost,
            totalReturn: 0,
            totalReturnPercent: 0,
            assetType: tradeModal.stock.type.toLowerCase() as 'stock' | 'etf' | 'crypto',
          };

          onAddPosition(newPosition);
          
          // Update portfolio balance
          const newPortfolio = {
            ...portfolio,
            virtualBalance: portfolio.virtualBalance - totalCost,
          };
          
          onUpdatePortfolio(newPortfolio);
        }
      } else {
        // Sell logic
        const existingPosition = portfolio.positions.find(p => p.symbol === tradeModal.stock.symbol);
        if (!existingPosition) {
          throw new Error('Position not found');
        }

        if (tradeQuantity > existingPosition.quantity) {
          throw new Error('Cannot sell more than you own');
        }

        const sellValue = tradeQuantity * priceData.price;

        if (tradeQuantity === existingPosition.quantity) {
          // Sell entire position
          onRemovePosition(existingPosition.id);
        } else {
          // Partial sell
          const newQuantity = existingPosition.quantity - tradeQuantity;
          const updatedPosition: Position = {
            ...existingPosition,
            quantity: newQuantity,
            currentPrice: priceData.price,
            totalValue: newQuantity * priceData.price,
            totalReturn: (priceData.price - existingPosition.averagePrice) * newQuantity,
            totalReturnPercent: ((priceData.price - existingPosition.averagePrice) / existingPosition.averagePrice) * 100,
          };

          const updatedPositions = portfolio.positions.map(p => 
            p.id === existingPosition.id ? updatedPosition : p
          );
          
          const newPortfolio = {
            ...portfolio,
            positions: updatedPositions,
          };

          onUpdatePortfolio(newPortfolio);
        }

        // Update portfolio balance
        const newPortfolio = {
          ...portfolio,
          virtualBalance: portfolio.virtualBalance + sellValue,
        };
        
        onUpdatePortfolio(newPortfolio);
      }

      // Close modal and reset
      setTradeModal(null);
      setQuantity('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Value</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(portfolio.totalValue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Available Balance</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(portfolio.virtualBalance)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className={`${portfolio.totalReturn >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${portfolio.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Total Return
                </p>
                <p className={`text-2xl font-bold ${portfolio.totalReturn >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                  {formatCurrency(portfolio.totalReturn)}
                </p>
                <p className={`text-sm ${portfolio.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercent(portfolio.totalReturnPercent)}
                </p>
              </div>
              {portfolio.totalReturn >= 0 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Stock Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Stocks</h3>
          <button
            onClick={() => setShowAddStock(!showAddStock)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </button>
        </div>

        {showAddStock && (
          <div className="mt-4">
            <StockSearch
              onSelectStock={handleSelectStock}
              placeholder="Search for stocks to add to your portfolio..."
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Positions List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Positions</h3>
        
        {portfolio.positions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No positions yet. Add some stocks to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {portfolio.positions.map((position) => {
              const currentData = marketData[position.symbol];
              const currentPrice = currentData?.price || position.currentPrice;
              const currentReturn = (currentPrice - position.averagePrice) * position.quantity;
              const currentReturnPercent = ((currentPrice - position.averagePrice) / position.averagePrice) * 100;

              return (
                <div key={position.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-900">{position.symbol}</h4>
                        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {position.assetType.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{position.name}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span>Qty: {position.quantity}</span>
                        <span>Avg: {formatCurrency(position.averagePrice)}</span>
                        <span>Current: {formatCurrency(currentPrice)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(position.quantity * currentPrice)}
                      </p>
                      <p className={`text-sm ${currentReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(currentReturn)} ({formatPercent(currentReturnPercent)})
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => setTradeModal({ 
                            stock: { 
                              symbol: position.symbol, 
                              name: position.name,
                              type: position.assetType,
                              region: 'United States',
                              timezone: 'UTC-04',
                              currency: 'USD',
                              matchScore: 1.0,
                            }, 
                            action: 'buy' 
                          })}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          Buy More
                        </button>
                        <button
                          onClick={() => setTradeModal({ 
                            stock: { 
                              symbol: position.symbol, 
                              name: position.name,
                              type: position.assetType,
                              region: 'United States',
                              timezone: 'UTC-04',
                              currency: 'USD',
                              matchScore: 1.0,
                            }, 
                            action: 'sell',
                            maxQuantity: position.quantity
                          })}
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Trade Modal */}
      {tradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {tradeModal.action === 'buy' ? 'Buy' : 'Sell'} {tradeModal.stock.symbol}
              </h3>
              <button
                onClick={() => setTradeModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  min="0.01"
                  step="0.01"
                  max={tradeModal.maxQuantity}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {tradeModal.maxQuantity && (
                  <p className="text-sm text-gray-500 mt-1">
                    Max: {tradeModal.maxQuantity}
                  </p>
                )}
              </div>

              {error && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setTradeModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTrade}
                  disabled={!quantity || isLoading}
                  className={`flex-1 px-4 py-2 rounded-lg text-white ${
                    tradeModal.action === 'buy'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? 'Processing...' : `${tradeModal.action === 'buy' ? 'Buy' : 'Sell'} Stock`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 