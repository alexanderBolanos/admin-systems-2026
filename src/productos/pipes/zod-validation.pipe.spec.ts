import { BadRequestException } from "@nestjs/common";
import { ZodValidationPipe } from "./zod-validation.pipe";
import { productoSchema } from "../schemas/producto.schema";

describe("ZodValidationPipe", () => {
  const pipe = new ZodValidationPipe(productoSchema);

  it("devuelve los datos parseados cuando son válidos", () => {
    const resultado = pipe.transform({ nombre: "Mouse", precio: 50, stock: 3 });

    expect(resultado).toEqual({ nombre: "Mouse", precio: 50, stock: 3 });
  });

  it("lanza BadRequestException cuando el stock es negativo", () => {
    expect(() => pipe.transform({ nombre: "Mouse", precio: 50, stock: -1 })).toThrow(
      BadRequestException,
    );
  });

  it("lanza BadRequestException cuando falta un campo requerido", () => {
    expect(() => pipe.transform({ precio: 50, stock: 3 })).toThrow(BadRequestException);
  });
});
