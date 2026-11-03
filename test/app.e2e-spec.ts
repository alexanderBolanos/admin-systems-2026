import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("AppModule (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /hola-mundo devuelve Hola Mundo", async () => {
    const response = await request(app.getHttpServer()).get("/hola-mundo");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hola Mundo");
  });

  it("GET / devuelve API funcionando", async () => {
    const response = await request(app.getHttpServer()).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("API funcionando");
  });

  describe("POST /productos (class-validator)", () => {
    it("crea un producto con datos válidos", async () => {
      const response = await request(app.getHttpServer())
        .post("/productos")
        .send({ nombre: "Teclado", precio: 150, stock: 10 });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({ nombre: "Teclado", precio: 150, stock: 10 });
    });

    it("rechaza un producto con precio negativo", async () => {
      const response = await request(app.getHttpServer())
        .post("/productos")
        .send({ nombre: "Teclado", precio: -1, stock: 10 });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /productos/zod (Zod)", () => {
    it("crea un producto con datos válidos", async () => {
      const response = await request(app.getHttpServer())
        .post("/productos/zod")
        .send({ nombre: "Mouse", precio: 50, stock: 5 });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({ nombre: "Mouse", precio: 50, stock: 5 });
    });

    it("rechaza un producto con stock negativo", async () => {
      const response = await request(app.getHttpServer())
        .post("/productos/zod")
        .send({ nombre: "Mouse", precio: 50, stock: -5 });

      expect(response.status).toBe(400);
    });
  });

  it("GET /productos lista los productos creados", async () => {
    await request(app.getHttpServer()).post("/productos").send({
      nombre: "Monitor",
      precio: 900,
      stock: 2,
    });

    const response = await request(app.getHttpServer()).get("/productos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  describe("GET /productos/:id", () => {
    it("devuelve el producto cuando existe", async () => {
      const creado = await request(app.getHttpServer())
        .post("/productos")
        .send({ nombre: "Monitor", precio: 900, stock: 2 });

      const response = await request(app.getHttpServer()).get(
        `/productos/${creado.body.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ nombre: "Monitor", precio: 900, stock: 2 });
    });

    it("devuelve 404 cuando el producto no existe", async () => {
      const response = await request(app.getHttpServer()).get("/productos/999999");

      expect(response.status).toBe(404);
    });
  });
});
