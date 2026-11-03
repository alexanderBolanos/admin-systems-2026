import { z } from "zod";

export const productoSchema = z.object({
  nombre: z.string().min(1, "nombre no puede estar vacío"),
  precio: z.number().positive("precio debe ser mayor que 0"),
  stock: z.number().int().min(0, "stock no puede ser negativo"),
});

export type ProductoZodDto = z.infer<typeof productoSchema>;
