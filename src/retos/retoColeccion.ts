import { Reto } from "./reto";
import { Actividad, Ruta } from "../rutas/ruta";
import { Usuario } from "../usuarios/usuario";

/**
 * Clase RetoColeccion que alberga
 * @param _retos Colección de retos
 */
export class RetoColeccion {
  protected _retos: Reto[];

  /**
   * Constructor de la clase RetoColeccion
   * @param retos Colección de retos
   */
  constructor(retos: Reto[]) {
    this._retos = retos;
  }

  insertarReto(id : number, nombre : string, rutas : Ruta[], tipoActividad : Actividad, usuarios : Usuario[]) {
    this._retos.push(new Reto(id, nombre, rutas, tipoActividad, usuarios))
  }
}