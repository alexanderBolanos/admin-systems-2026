import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getEstado(): string {
    return "API funcionando";
  }

  getHolaMundo(): string {
    return "Hola Mundo";
  }

  getSaludo(nombre: string): string {
    const saludo = "Hola " + nombre;
    console.log(saludo);
  }
}
