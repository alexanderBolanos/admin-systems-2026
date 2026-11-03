import { Injectable, NotFoundException } from "@nestjs/common";
import { Producto } from "./producto.entity";

@Injectable()
export class ProductosService {
  private readonly productos: Producto[] = [];
  private nextId = 1;

  create(datos: Omit<Producto, "id">): Producto {
    const producto: Producto = { id: this.nextId++, ...datos };
    this.productos.push(producto);
    return producto;
  }

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }
}
