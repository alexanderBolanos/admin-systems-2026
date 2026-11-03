import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsInt()
  @Min(0)
  stock: number;
}
