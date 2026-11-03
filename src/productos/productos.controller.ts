import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ProductosService } from "./productos.service";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { ZodValidationPipe } from "./pipes/zod-validation.pipe";
import { productoSchema, ProductoZodDto } from "./schemas/producto.schema";
import { Producto } from "./producto.entity";

@Controller("productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll(): Producto[] {
    return this.productosService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Producto {
    return this.productosService.findOne(id);
  }

  /**
   * Demo de validación con class-validator: el DTO decorado se valida
   * mediante el ValidationPipe global registrado en main.ts.
   */
  @Post()
  create(@Body() dto: CreateProductoDto): Producto {
    return this.productosService.create(dto);
  }

  /**
   * Demo de validación con Zod: el esquema se valida explícitamente
   * mediante el ZodValidationPipe aplicado a esta ruta.
   */
  @Post("zod")
  createConZod(@Body(new ZodValidationPipe(productoSchema)) dto: ProductoZodDto): Producto {
    return this.productosService.create(dto);
  }
}
