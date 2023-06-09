import { Actividad } from "../internal";
import { EstadisticasEntrenamiento } from "../internal";

export type HistoricoRuta = [string, number];
export type Coleccion = number[][];

/**
 * Clase Usuario que alberga los distintos 
 * @param _ID ID único del usuario
 * @param _nombre Nombre propio de usuario
 * @param _actividades Tipo de actividad: correr o bicicleta
 * @param _amigosApp Colleción de IDs de usuarios con los que se interacciona
 * @param _grupoAmigos  Diferentes colecciones de IDs de usuarios con los que suele realizar rutas
 * @param _entrenamiento Cantidad de km y desnivel total acumulados en la semana, mes y año
 * @param _rutasFavoritas Colección de IDs de las rutas que el usuario ha realizado con mayor frecuencia
 * @param _retosActivos Colección de IDs de los retos que el usuario está realizando actualmente
 * @param _historicoRutas Colección del historial de rutas realizadas 
 */
export class Usuario {
  private _ID: number;
  private _nombre: string;
  private _actividades: Actividad;
  private _amigosApp: number[];
  private _grupoAmigos: Coleccion;
  private _entrenamiento: EstadisticasEntrenamiento;
  private _rutasFavoritas: number[];
  private _retosActivos: number[];
  private _historicoRutas: HistoricoRuta[];

  /**
   * Constructor de la clase Usuario
   * @param ID ID único del usuario
   * @param nombre Nombre propio de usuario
   * @param actividades Tipo de actividad: correr o bicicleta
   * @param amigosApp Colleción de IDs de usuarios con los que se interacciona
   * @param grupoAmigos  Diferentes colecciones de IDs de usuarios con los que suele realizar rutas
   * @param entrenamiento Cantidad de km y desnivel total acumulados en la semana, mes y año
   * @param rutasFavoritas Colección de IDs de las rutas que el usuario ha realizado con mayor frecuencia
   * @param retosActivos Colección de IDs de los retos que el usuario está realizando actualmente
   * @param historicoRutas Colección del historial de rutas realizadas 
   */
  constructor(ID: number, nombre: string, actividades: Actividad, amigosApp: number[],
              grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, rutasFavoritas: number[],
              retosActivos: number[], historicoRutas: HistoricoRuta[]) {
    this._ID = ID;
    this._nombre = nombre;
    this._actividades = actividades;
    this._amigosApp = amigosApp;
    this._grupoAmigos = grupoAmigos;
    this._entrenamiento = entrenamiento;
    this._rutasFavoritas = rutasFavoritas;
    this._retosActivos = retosActivos;
    this._historicoRutas = historicoRutas;
  }

  mostrarUsuario () : void {
    console.log(`ID: ${this._ID}`);
    console.log(`Nombre: ${this._nombre}`);
    console.log(`Actividades: ${this._actividades}`);
    console.log(`Amigos de la app: ${this._amigosApp}`);
    console.log(`Grupo de Amigos: ${this._grupoAmigos}`);
    console.log(`Entrenamiento: ${this._entrenamiento}`);
    console.log(`Rutas favoritas: ${this._rutasFavoritas}`);
    console.log(`Retos activos: ${this._retosActivos}`);
    console.log(`Histórico rutas: ${this._historicoRutas}`);
  }

    /**
   * Función para añadir amigo,
   * incluyendo su ID en atributo de la clase _AmigosApp
   * @param ID del amigo que es usuario
   */
  incluirAmigo (ID: number) {
    this._amigosApp.push(ID);
  }

  quitarAmigo (ID: number) {
    let index: number = this._amigosApp.findIndex(id => id === ID);
    this._amigosApp.splice(index, 1);
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
   * @param ID ID único de la usuario
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
   * @param nombre Nombre de la usuario
   */
  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  /**
   * Getter del atributo _actividades
   * @return atributo _actividades
   */
  get actividades() {
    return this._actividades;
  }
  /**
   * Setter del atributo _actividades
   * @param actividades Tipo de actividad: bicicleta o correr
   */
  set actividades(actividades: Actividad) {
    this._actividades = actividades;
  }

  /**
   * Getter del atributo _amigosApp
   * @return atributo _amigosApp
   */
  get amigosApp() {
    return this._amigosApp;
  }
  /**
   * Setter del atributo _amigosApp
   * @param amigosApp Diferentes colecciones de IDs de usuarios con los que suele realizar rutas
   */
  set amigosApp(amigosApp: number[]) {
    this._amigosApp = amigosApp;
  }

  /**
   * Getter del atributo _grupoAmigos
   * @return atributo _grupoAmigos
   */
  get grupoAmigos() {
    return this._grupoAmigos;
  }
  /**
   * Setter del atributo _grupoAmigos
   * @param amigosApp Colleción de IDs de usuarios con los que se interacciona
   */
  set grupoAmigos(grupoAmigos: Coleccion) {
    this._grupoAmigos = grupoAmigos;
  }

  /**
   * Getter del atributo _entrenamiento
   * @return atributo _entrenamiento
   */
  get entrenamiento() {
    return this._entrenamiento;
  }
  /**
   * Setter del atributo _entrenamiento
   * @param entrenamiento Cantidad de km y desnivel total acumulados en la semana, mes y año
   */
  set entrenamiento(entrenamiento: EstadisticasEntrenamiento) {
    this._entrenamiento = entrenamiento;
  }

  /**
   * Getter del atributo _rutasFavoritas
   * @return atributo _rutasFavoritas
   */
  get rutasFavoritas() {
    return this._rutasFavoritas;
  }
  /**
   * Setter del atributo _rutasFavoritas
   * @param rutasFavoritas  IDs de las rutas que el usuario ha realizado con mayor frecuencia
   */
  set rutasFavoritas(rutasFavoritas: number[]) {
    this._rutasFavoritas = rutasFavoritas;
  }
  /**
   * Getter del atributo _retosActivos
   * @return atributo _retosActivos
   */
  get retosActivos() {
    return this._retosActivos;
  }
  /**
   * Setter del atributo _retosActivos
   * @param rutasFavoritas IDs de los retos que el usuario está realizando actualmente
   */
  set retosActivos(retosActivos: number[]) {
    this._retosActivos = retosActivos;
  }

  /**
   * Getter del atributo _historicoRutas
   * @return atributo _historicoRutas
   */
  get historicoRutas() {
    return this._historicoRutas;
  }
  /**
   * Setter del atributo _historicoRutas
   * @param historicoRutas Colección del historial de rutas realizadas 
   */
  set historicoRutas(historicoRutas: HistoricoRuta[]) {
    this._historicoRutas = historicoRutas;
  }
}