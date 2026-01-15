import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Item } from 'src/Item/item.model';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
