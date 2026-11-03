import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getEstado(): string {
    return "API funcionando";
  }

  getHolaMundo(): string {
    return "Hola Mundo";
  }
}
