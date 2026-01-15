import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Item } from 'src/Item/item.model';
import { BudgetService } from 'src/Budget/budget.service';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [TransactionsController],
  providers: [TransactionsService, BudgetService],
  exports: [BudgetService],
})
export class TransactionsModule {}
