import { Usuario } from "./usuario";

/**
 * Clase UsuarioColeccion que alberga
 * @param _usuarios Colección de usuarios
 */
export class UsuarioColeccion {
  private _usuarios: Usuario[];
  /**
   * Constructor de la clase UsuarioColeccion
   * @param usuarios Colección de usuarios
   */
  constructor( usuarios: Usuario[]) {
    this._usuarios = usuarios;
  }

}