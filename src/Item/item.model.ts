import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'items', timestamps: false })
export class Item extends Model {
  @Column({
    type: DataType.STRING(255),
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare pricePerUnit: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare hasImage: boolean;
}
