import { Reto } from "./reto";
import { Actividad, Ruta } from "../rutas/ruta";
import { Usuario } from "../usuarios/usuario";
import { jsonRutasColeccion, jsonUsuariosColeccion } from "../index"

/**
 * Clase RetoColeccion que alberga
 * @param _retos Colección de retos
 */
export class RetoColeccion {
  protected _retos: Reto[];
  protected _ultID: number;

  /**
   * Constructor de la clase RetoColeccion
   * @param retos Colección de retos
   */
  constructor(retos: Reto[]) {
    this._retos = retos;
    if (retos.length != 0) {
      this._ultID = retos[retos.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }

  insertarReto(nombre: string, rutasIds: number[], tipoActividad: Actividad, usuariosIds: number[]) {
    let rutas: Ruta[] = jsonRutasColeccion.buscarRutas(rutasIds);
    let usuarios: Usuario[] = jsonUsuariosColeccion.buscarUsuarios(usuariosIds);

    this._retos.push(new Reto(++this._ultID, nombre, rutas, tipoActividad, usuarios))
  }

  borrarReto(ID: number) : boolean {
    return false;
  }

  modificarReto(ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
    return false;
  }

}