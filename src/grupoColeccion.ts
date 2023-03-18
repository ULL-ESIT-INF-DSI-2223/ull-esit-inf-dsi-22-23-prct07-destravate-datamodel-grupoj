import { Grupo } from "./grupo";

/**
 * Clase GrupoColeccion que alberga
 * @param _grupos Colección de grupos
 */
export class GrupoColeccion {
  private _grupos : Grupo[];

  /**
   * Constructor de la clase GrupoColeccion
   * @param grupos Colección de grupos
   */
  constructor(grupos : Grupo[]) {
    this._grupos = grupos;
  }
}