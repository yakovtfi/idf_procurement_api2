import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BudgetService {
  private budgetPath = path.join(process.cwd(), 'budget.txt');
  private currentBudget: number;

  constructor() {
    this.loadBudget();
  }

  private loadBudget(): void {
    const content = fs.readFileSync(this.budgetPath, 'utf-8').trim();
    this.currentBudget = parseFloat(content);
  }

  private saveBudget(): void {
    fs.writeFileSync(this.budgetPath, this.currentBudget.toString());
  }

  getBudget(): number {
    return this.currentBudget;
  }

  reduceBudget(amount: number): boolean {
    if (this.currentBudget - amount < 0) {
      return false;
    }
    this.currentBudget -= amount;
    this.saveBudget();
    return true;
  }
}
