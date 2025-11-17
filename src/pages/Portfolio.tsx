// src/pages/Portfolio.tsx

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Trophy,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

// Mock data (unchanged)
const portfolioStats = {
  totalValue: 15420.5,
  availableBalance: 5234.2,
  totalProfit: 2340.8,
  winRate: 67.5,
  rank: 342,
};

const openPositions = [
  {
    id: "1",
    question: "Will Bitcoin exceed $100K by EOY 2025?",
    outcome: "YES",
    shares: 500,
    avgPrice: 0.62,
    currentPrice: 0.67,
    value: 335,
    pnl: 25,
    endDate: "2025-12-31",
  },
  {
    id: "2",
    question: "Will Ethereum complete next upgrade?",
    outcome: "YES",
    shares: 300,
    avgPrice: 0.78,
    currentPrice: 0.82,
    value: 246,
    pnl: 12,
    endDate: "2025-06-30",
  },
];

const resolvedPositions = [
  {
    id: "3",
    question: "Will SOL reach $200 in Q1 2025?",
    outcome: "NO",
    shares: 400,
    avgPrice: 0.35,
    finalPrice: 0.0,
    result: "WON",
    pnl: 140,
    resolvedDate: "2025-03-31",
  },
  {
    id: "4",
    question: "Will a new L2 launch with >$1B TVL?",
    outcome: "YES",
    shares: 250,
    avgPrice: 0.55,
    finalPrice: 1.0,
    result: "WON",
    pnl: 112.5,
    resolvedDate: "2025-02-15",
  },
];

const transactions = [
  {
    id: "1",
    type: "BUY",
    market: "Will BTC exceed $100K...",
    outcome: "YES",
    shares: 200,
    price: 0.65,
    total: 130,
    date: "2025-03-15",
  },
  {
    id: "2",
    type: "SELL",
    market: "Will ETH complete upgrade...",
    outcome: "YES",
    shares: 150,
    price: 0.81,
    total: 121.5,
    date: "2025-03-14",
  },
];

// Helper component for Position Card Skeleton
const PositionCardSkeleton = () => (
  <Card className="p-6 bg-gradient-card border-border/50">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="text-right space-y-1">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  </Card>
);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true); // --- MOCK LOADING STATE ---

  useEffect(() => {
    // Simulate fetching data for 1.5 seconds
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  // ------------------------------------

  const statKeys = [
    { key: "totalValue", icon: Wallet, color: "text-primary" },
    { key: "availableBalance", icon: Wallet, color: "text-primary" },
    { key: "totalProfit", icon: TrendingUp, color: "text-success" },
    { key: "winRate", icon: Trophy, color: "text-accent" },
    { key: "rank", icon: Trophy, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />

      <div className="container px-4 pt-20 lg:pt-8 py-8"> {/* Adjusted pt-20 for mobile header clearance */}
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statKeys.map((stat, i) => (
            <Card key={i} className="p-6 bg-gradient-card border-border/50">
              {isLoading ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {i === 0 && "Total Value"}
                      {i === 1 && "Available"}
                      {i === 2 && "Total P&L"}
                      {i === 3 && "Win Rate"}
                      {i === 4 && "Rank"}
                    </span>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${i === 2 ? 'text-success' : ''}`}>
                    {i < 3 && "$"}
                    {i === 0 && portfolioStats.totalValue.toLocaleString()}
                    {i === 1 && portfolioStats.availableBalance.toLocaleString()}
                    {i === 2 && `+${portfolioStats.totalProfit.toLocaleString()}`}
                    {i === 3 && `${portfolioStats.winRate}%`}
                    {i === 4 && `#${portfolioStats.rank}`}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-success mt-1">
                    {i === 0 && (
                      <>
                        <TrendingUp className="h-3 w-3" />
                        <span>+12.4%</span>
                      </>
                    )}
                    {i === 1 && (
                      <Button variant="link" className="h-auto p-0 text-xs text-primary">
                        Deposit
                      </Button>
                    )}
                    {i === 2 && <span>All time</span>}
                    {i === 3 && <span className="text-muted-foreground">24 wins / 36 total</span>}
                    {i === 4 && (
                      <>
                        <ArrowUpRight className="h-3 w-3" />
                        <span>Top 5%</span>
                      </>
                    )}
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="positions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="positions">Open Positions</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          {/* Open Positions */}
          <TabsContent value="positions" className="space-y-4">
            {isLoading
              ? Array(2).fill(0).map((_, i) => <PositionCardSkeleton key={i} />)
              : openPositions.map((position) => (
                  <Card key={position.id} className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            className={
                              position.outcome === "YES"
                                ? "bg-success/10 text-success border-success/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            }
                          >
                            {position.outcome}
                          </Badge>
                          <h3 className="font-semibold text-lg">{position.question}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{position.shares} shares @ ${position.avgPrice}</span>
                          <span>·</span>
                          <span>Closes {new Date(position.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">Current Value</div>
                          <div className="text-xl font-bold">${position.value}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">P&L</div>
                          <div
                            className={`text-xl font-bold flex items-center gap-1 ${
                              position.pnl >= 0 ? "text-success" : "text-destructive"
                            }`}
                          >
                            {position.pnl >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            ${Math.abs(position.pnl)}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-primary/50 hover:bg-primary/10"
                        >
                          Trade
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
          </TabsContent>

          {/* Resolved Positions */}
          <TabsContent value="resolved" className="space-y-4">
            {isLoading
              ? Array(2).fill(0).map((_, i) => <PositionCardSkeleton key={i} />)
              : resolvedPositions.map((position) => (
                  <Card key={position.id} className="p-6 bg-gradient-card border-border/50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            className={
                              position.result === "WON"
                                ? "bg-success/10 text-success border-success/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            }
                          >
                            {position.result}
                          </Badge>
                          <Badge variant="outline">{position.outcome}</Badge>
                          <h3 className="font-semibold text-lg">{position.question}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{position.shares} shares @ ${position.avgPrice}</span>
                          <span>·</span>
                          <span>Resolved {new Date(position.resolvedDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">Final P&L</div>
                          <div
                            className={`text-xl font-bold flex items-center gap-1 ${
                              position.pnl >= 0 ? "text-success" : "text-destructive"
                            }`}
                          >
                            {position.pnl >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            ${Math.abs(position.pnl)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
          </TabsContent>

          {/* Transactions */}
          <TabsContent value="transactions">
            <Card className="bg-gradient-card border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-semibold">Type</th>
                      <th className="text-left p-4 font-semibold">Market</th>
                      <th className="text-left p-4 font-semibold">Outcome</th>
                      <th className="text-right p-4 font-semibold">Shares</th>
                      <th className="text-right p-4 font-semibold">Price</th>
                      <th className="text-right p-4 font-semibold">Total</th>
                      <th className="text-right p-4 font-semibold">Date</th>
                      <th className="text-right p-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading
                      ? Array(3).fill(0).map((_, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="p-4"><Skeleton className="h-4 w-10" /></td>
                            <td className="p-4"><Skeleton className="h-4 w-2/3" /></td>
                            <td className="p-4"><Skeleton className="h-4 w-10" /></td>
                            <td className="p-4 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                            <td className="p-4 text-right"><Skeleton className="h-4 w-10 ml-auto" /></td>
                            <td className="p-4 text-right"><Skeleton className="h-4 w-12 ml-auto" /></td>
                            <td className="p-4 text-right"><Skeleton className="h-4 w-16 ml-auto" /></td>
                            <td className="p-4 text-right"><Button variant="ghost" size="icon"><Skeleton className="h-4 w-4" /></Button></td>
                          </tr>
                        ))
                      : transactions.map((tx) => (
                          <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/50">
                            <td className="p-4">
                              <Badge
                                className={
                                  tx.type === "BUY"
                                    ? "bg-success/10 text-success border-success/20"
                                    : "bg-destructive/10 text-destructive border-destructive/20"
                                }
                              >
                                {tx.type}
                              </Badge>
                            </td>
                            <td className="p-4 font-medium">{tx.market}</td>
                            <td className="p-4">
                              <Badge variant="outline">{tx.outcome}</Badge>
                            </td>
                            <td className="p-4 text-right">{tx.shares}</td>
                            <td className="p-4 text-right">${tx.price}</td>
                            <td className="p-4 text-right font-semibold">${tx.total}</td>
                            <td className="p-4 text-right text-sm text-muted-foreground">
                              {new Date(tx.date).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right">
                              <Button variant="ghost" size="icon">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Portfolio;
