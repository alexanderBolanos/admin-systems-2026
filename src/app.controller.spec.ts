import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("getEstado", () => {
    it('devuelve "API funcionando"', () => {
      expect(appController.getEstado()).toBe("API funcionando");
    });
  });

  describe("getHolaMundo", () => {
    it('devuelve "Hola Mundo"', () => {
      expect(appController.getHolaMundo()).toBe("Hola Mundo");
    });
  });

  describe("getSaludo", () => {
    it('devuelve "Hola <nombre>" cuando se pasa el query param', () => {
      expect(appController.getSaludo("Alex")).toBe("Hola Alex");
    });

    it("lanza BadRequestException cuando falta el nombre", () => {
      expect(() => appController.getSaludo()).toThrow(BadRequestException);
    });

    it("lanza BadRequestException cuando el nombre viene vacío", () => {
      expect(() => appController.getSaludo("")).toThrow(BadRequestException);
    });
  });
});
