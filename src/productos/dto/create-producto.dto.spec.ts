import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateProductoDto } from "./create-producto.dto";

describe("CreateProductoDto (class-validator)", () => {
  it("no reporta errores con datos válidos", async () => {
    const dto = plainToInstance(CreateProductoDto, {
      nombre: "Teclado",
      precio: 150,
      stock: 10,
    });

    const errores = await validate(dto);

    expect(errores).toHaveLength(0);
  });

  it("reporta error cuando precio no es positivo", async () => {
    const dto = plainToInstance(CreateProductoDto, {
      nombre: "Teclado",
      precio: -5,
      stock: 10,
    });

    const errores = await validate(dto);

    expect(errores.length).toBeGreaterThan(0);
    expect(errores.some((e) => e.property === "precio")).toBe(true);
  });

  it("reporta error cuando nombre está vacío", async () => {
    const dto = plainToInstance(CreateProductoDto, {
      nombre: "",
      precio: 10,
      stock: 1,
    });

    const errores = await validate(dto);

    expect(errores.some((e) => e.property === "nombre")).toBe(true);
  });
});
