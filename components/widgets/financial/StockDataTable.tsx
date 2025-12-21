"use client";

import {
  Card,
  Title,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from "@tremor/react";
import { stockHoldings } from "@/lib/sample-data";

interface StockDataTableProps {
  title?: string;
  showPagination?: boolean;
  pageSize?: number;
}

export function StockDataTable({
  title = "Stock Holdings",
}: StockDataTableProps) {
  return (
    <Card className="w-full h-full overflow-auto">
      <Title>{title}</Title>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Symbol</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Shares</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Change</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockHoldings.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell>
                <span className="font-medium">{stock.symbol}</span>
              </TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.shares}</TableCell>
              <TableCell>${stock.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge color={stock.change >= 0 ? "emerald" : "red"}>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </Badge>
              </TableCell>
              <TableCell>${stock.value.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
