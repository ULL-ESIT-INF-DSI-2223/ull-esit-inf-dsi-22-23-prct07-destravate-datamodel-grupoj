import { Actividad, Ruta } from "../rutas/ruta";
import { Usuario } from "../usuarios/usuario";

/**
  * Clase Reto que alberga información de una reto, objetivos de entrenamientos
  * @param _ID ID único del reto
  * @param _nombre Nombre del reto
  * @param _rutas Rutas que forman parte del reto
  * @param _tipoActividad Tipo de actividad del reto: bicicleta o correr
  * @param _kilometrosTotales Km totales a realizar (como la suma de los kms de las rutas que lo engloban)
  * @param _usuarios Usuarios que están realizando el reto
  */
export class Reto {
  private _ID: number;
  private _nombre: string;
  private _rutas: Ruta[];
  private _tipoActividad: Actividad;
  private _kilometrosTotales: number;
  private _usuarios: Usuario[];

  /**
  * Constructor de la clase Reto
  * @param ID ID único del reto
  * @param nombre Nombre del reto
  * @param rutas Rutas que forman parte del reto
  * @param tipoActividad Tipo de actividad del reto: bicicleta o correr
  * @param kilometrosTotales Km totales a realizar (como la suma de los kms de las rutas que lo engloban)
  * @param usuarios Usuarios que están realizando el reto
  */
  constructor(id: number, nombre: string, rutas: Ruta[], tipoActividad: Actividad, usuarios: Usuario[]) {
    this._ID = id;
    this._nombre = nombre;
    this._rutas = rutas;
    this._tipoActividad = tipoActividad;
    this._kilometrosTotales = 0;
    rutas.forEach(ruta => {
      this._kilometrosTotales += ruta.longitud;
    })
    this._usuarios = usuarios;
  }

  /**
   * Getter del atributo _ID
   * @return atributo _ID 
   */
  get ID() {
    return this._ID;
  }
  /**
   * Setter del atributo _ID
   * @param ID ID único de la reto
   */
  set ID(ID: number) {
    this._ID = ID;
  }
  
  /**
   * Getter del atributo _nombre
   * @return atributo _nombre
   */
  get nombre() {
    return this._nombre;
  }
  /**
   * Setter del atributo _nombre
   * @param nombre Nombre de la reto
   */
  set nombre(nombre: string) {
    this._nombre = nombre;
  }
  
  /**
   * Getter del atributo _rutas
   * @return atributo _rutas
   */
  get rutas() {
    return this._rutas;
  }
  /**
   * Setter del atributo _rutas
   * @param rutas Rutas que forman parte del reto
   */
  set rutas(rutas: Ruta[]) {
    this._rutas = rutas;
  }

  /**
   * Getter del atributo _tipoActividad
   * @return atributo _tipoActividad
   */
  get tipoActividad() {
    return this._tipoActividad;
  }
  /**
   * Setter del atributo _tipoActividad
   * @param tipoActividad Tipo de actividad del reto: bicicleta o correr.
   */
  set tipoActividad(tipoActividad: Actividad) {
    this._tipoActividad = tipoActividad;
  }

  /**
   * Getter del atributo _kilometrosTotales
   * @return atributo _kilometrosTotales
   */
  get kilometrosTotales() {
    return this._kilometrosTotales;
  }
  /**
   * Setter del atributo _tipoActividad
   * @param kilometrosTotales Km totales a realizar (como la suma de los kms de las rutas que lo engloban)
   */
  set kilometrosTotales(kilometrosTotales: number) {
    this._kilometrosTotales = kilometrosTotales;
  }

  /**
   * Getter del atributo _usuarios
   * @return atributo _usuarios
   */
  get usuarios() {
    return this._usuarios;
  }
  /**
   * Setter del atributo _usuarios
   * @param usuarios Usuarios que están realizando el reto
   */
  set usuarios(usuarios: Usuario[]) {
    this._usuarios = usuarios;
  }
}