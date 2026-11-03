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
});
