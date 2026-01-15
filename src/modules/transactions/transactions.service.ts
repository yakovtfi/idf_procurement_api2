import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from 'src/Item/item.model';
import { BudgetService } from 'src/Budget/budget.service';

interface PurchaseItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  pricePerUnit: number;
}

interface PurchaseResult {
  id: string;
  newQuantity: number;
  spent: number;
}

@Injectable()
export class TransactionsService {
  private logger = new Logger(TransactionsService.name);

  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
    private budgetService: BudgetService,
  ) {}

  async processPurchase(purchases: PurchaseItem[]): Promise<PurchaseResult[]> {
    if (!purchases || !Array.isArray(purchases) || purchases.length === 0) {
      throw new BadRequestException(
        'Purchases array is required and cannot be empty',
      );
    }

    const totalCost = purchases.reduce(
      (sum, item) => sum + item.quantity * item.pricePerUnit,
      0,
    );

    if (this.budgetService.getBudget() - totalCost < 0) {
      this.logger.error(
        `Purchase rejected: insufficient budget. Required: ${totalCost}, Available: ${this.budgetService.getBudget()}`,
      );
      throw new BadRequestException('Insufficient budget for this purchase');
    }

    const results: PurchaseResult[] = [];

    for (const purchase of purchases) {
      let item = await this.itemModel.findOne({
        where: { id: purchase.id },
      });

      const spent = purchase.quantity * purchase.pricePerUnit;

      if (!item) {
        item = await this.itemModel.create({
          id: purchase.id,
          name: purchase.name,
          type: purchase.type,
          quantity: purchase.quantity,
          pricePerUnit: purchase.pricePerUnit,
          hasImage: false,
        });
      } else {
        item.quantity += purchase.quantity;
        await item.save();
      }

      results.push({
        id: purchase.id,
        newQuantity: item.quantity,
        spent,
      });
    }

    this.budgetService.reduceBudget(totalCost);

    return results;
  }
}
