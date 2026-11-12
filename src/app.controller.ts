import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEstado(): string {
    return this.appService.getEstado();
  }

  @Get("hola-mundo")
  getHolaMundo(): string {
    return this.appService.getHolaMundo();
  }

  @Get("saludo")
  getSaludo(@Query("nombre") nombre?: string): string {
    if (!nombre) {
      throw new BadRequestException("El query param 'nombre' es requerido");
    }
    return this.appService.getSaludo(nombre);
  }
}
