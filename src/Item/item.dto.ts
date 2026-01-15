import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  pricePerUnit: number;

  @IsOptional()
  @IsBoolean()
  hasImage?: boolean;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerUnit?: number;

  @IsOptional()
  @IsBoolean()
  hasImage?: boolean;
}
