import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

interface PurchaseItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  pricePerUnit: number;
}

interface PurchaseRequest {
  purchases: PurchaseItem[];
}

interface PurchaseResult {
  id: string;
  newQuantity: number;
  spent: number;
}

interface PurchaseResponse {
  results: PurchaseResult[];
}

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('purchase')
  async purchase(@Body() body: PurchaseRequest): Promise<PurchaseResponse> {
    if (!body || !body.purchases || !Array.isArray(body.purchases)) {
      throw new BadRequestException(
        'Request body must contain a purchases array',
      );
    }
    const results = await this.transactionsService.processPurchase(
      body.purchases,
    );
    return { results };
  }
}
