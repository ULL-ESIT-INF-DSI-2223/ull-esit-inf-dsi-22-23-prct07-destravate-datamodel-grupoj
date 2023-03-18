import { Reto } from "./reto";

/**
 * Clase RetoColeccion que alberga
 * @param _retos Colección de retos
 */
export class RetoColeccion {
  private _retos: Reto[];

  /**
   * Constructor de la clase RetoColeccion
   * @param retos Colección de retos
   */
  constructor(retos: Reto[]) {
    this._retos = retos;
  }

}