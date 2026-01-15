import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ImagesModule } from './modules/images/images.module';
import { Item } from './Item/item.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'yakov',
      password: process.env.DB_PASSWORD || 'AA343254325',
      database: process.env.DB_NAME || 'IDF',
      models: [Item],
      autoLoadModels: true,
      synchronize: true,
    }),
    TransactionsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
