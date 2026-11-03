import { Controller, Get } from "@nestjs/common";
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
}
