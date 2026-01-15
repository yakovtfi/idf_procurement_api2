import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService, ImageCheckResponse } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('check/:itemId')
  @UseInterceptors(FileInterceptor('image'))
  async checkImage(
    @Param('itemId') itemId: string,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ImageCheckResponse> {
    if (!image) {
      throw new BadRequestException('No image provided');
    }

    return this.imagesService.validateImage(itemId, image);
  }
}
