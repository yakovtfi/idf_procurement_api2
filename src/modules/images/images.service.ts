import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from 'src/Item/item.model';

export interface ImageCheckResponse {
  itemId: string;
  isValid: boolean;
  reason: string | null;
}

@Injectable()
export class ImagesService {
  private readonly MAX_FILE_SIZE = 250 * 1024 * 1024;
  private readonly ALLOWED_MIME_TYPE = 'image/png';

  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}

  async validateImage(
    itemId: string,
    file: Express.Multer.File,
  ): Promise<ImageCheckResponse> {
    const item = await this.itemModel.findOne({ where: { id: itemId } });

    if (!item) {
      throw new BadRequestException('Item not found');
    }

    if (!file) {
      return {
        itemId,
        isValid: false,
        reason: 'No file uploaded',
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return {
        itemId,
        isValid: false,
        reason: 'File is too large',
      };
    }

    if (file.mimetype !== this.ALLOWED_MIME_TYPE) {
      return {
        itemId,
        isValid: false,
        reason: 'File type must be PNG',
      };
    }

    item.hasImage = true;
    await item.save();

    return {
      itemId,
      isValid: true,
      reason: null,
    };
  }
}
