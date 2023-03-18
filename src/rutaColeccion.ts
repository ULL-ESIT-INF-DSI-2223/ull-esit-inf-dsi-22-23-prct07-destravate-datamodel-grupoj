import { Ruta } from "./ruta";

/**
 * Clase RutaColeccion que alberga
 * @param _rutas Colección de rutas
 */
export class RutaColeccion {
  private _rutas: Ruta[];
  /**
   * Constructor de la clase RutaColeccion
   * @param rutas Colección de rutas
   */
  constructor(rutas: Ruta[]) {
    this._rutas = rutas;
  }
  
}