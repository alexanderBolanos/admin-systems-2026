# admin-systems-2026

Proyecto de pruebas del curso Administración de Sistemas.

## Demo: NestJS + class-validator + Zod

Esta API demuestra dos estrategias de validación de datos en NestJS sobre un
mismo recurso (`productos`), para poder compararlas lado a lado:

- **class-validator** (`POST /productos`): el DTO (`CreateProductoDto`) se
  decora con `@IsString`, `@IsNumber`, etc. y se valida automáticamente
  mediante el `ValidationPipe` global registrado en `src/main.ts`.
- **Zod** (`POST /productos/zod`): el cuerpo de la petición se valida
  explícitamente contra un `z.object(...)` (`src/productos/schemas/producto.schema.ts`)
  usando un `ZodValidationPipe` custom (`src/productos/pipes/zod-validation.pipe.ts`).

### Endpoints

| Método | Ruta              | Descripción                                      |
| ------ | ----------------- | ------------------------------------------------- |
| GET    | `/`                | Estado de la API                                  |
| GET    | `/hola-mundo`      | Respuesta de prueba ("Hola Mundo")                |
| GET    | `/productos`       | Lista los productos creados (en memoria)          |
| GET    | `/productos/:id`   | Obtiene un producto por id                        |
| POST   | `/productos`       | Crea un producto, validado con **class-validator** |
| POST   | `/productos/zod`   | Crea un producto, validado con **Zod**             |

Cuerpo esperado para crear un producto (ambos endpoints):

```json
{ "nombre": "Teclado", "precio": 150, "stock": 10 }
```

### Ejecutar localmente

```bash
npm install
npm start
```

Luego puedes probarlo con:

```bash
curl http://localhost:3000/hola-mundo

curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado","precio":150,"stock":10}'

curl -X POST http://localhost:3000/productos/zod \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Mouse","precio":50,"stock":5}'
```

Durante desarrollo, para reiniciar automáticamente al guardar cambios:

```bash
npm run dev
```

### Validar con tests

```bash
npm test        # pruebas unitarias (DTOs, pipes, controladores)
npm run test:e2e  # pruebas end-to-end sobre la app completa (supertest)
```
