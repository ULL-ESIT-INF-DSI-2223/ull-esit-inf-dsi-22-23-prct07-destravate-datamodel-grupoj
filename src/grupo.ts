export type EstadisticasEntrenamiento = [number, number, string, number];
import { Usuario } from "./usuario";
import { Ruta } from "./ruta";

/**
 * Clase Grupo que alberga los distintos
 * usuarios que se unen para realizar rutas
 * en conjunto
  * @param _ID ID único del grupo
  * @param _nombre Nombre del grupo
  * @param _participantes  IDs de los miembros del grupo
  * @param _estadisticasEntrenamiento Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
  * @param _clasificacion Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado
  * @param _rutasFavoritas  Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas
 */
export class Grupo {
  private _ID : number;
  private _nombre : string;
  private _participantes : number[];
  private _estadisticasEntrenamiento : EstadisticasEntrenamiento;
  private _clasificacion : Usuario[];
  private _rutasFavoritas : Ruta[];
  private _historicoRutas : Ruta[];

  /**
  * Constructor de la clase GRrupo
  * @param ID ID único del grupo
  * @param nombre Nombre del grupo
  * @param participantes  IDs de los miembros del grupo
  * @param estadisticasEntrenamiento Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
  * @param clasificacion Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado
  * @param rutasFavoritas  Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas
  * @param historicoRutas todas las rutas que ha realizado el grupo en conjunto
  */
  constructor(ID : number, nombre : string, participantes : number[], estadisticasEntrenamiento : EstadisticasEntrenamiento,  
              clasificacion : Usuario[], rutasFavoritas : Ruta[], historicoRutas : Ruta[]) {
    this._ID = ID;
    this._nombre = nombre;
    this._participantes = participantes;
    this._estadisticasEntrenamiento = estadisticasEntrenamiento;
    this._clasificacion = clasificacion;
    this._rutasFavoritas = rutasFavoritas;
    this._historicoRutas = historicoRutas;
  }

  mostrarGrupo () : void {
    console.log(`ID: ${this._ID}`);
    console.log(`Nombre: ${this._nombre}`);
    console.log(`Participantes: ${this._participantes}`);
    console.log(`Estadisticas de entrenamiento: ${this._estadisticasEntrenamiento}`);
    console.log(`Clasificación: ${this._clasificacion}`);
    console.log(`Rutas favoritas: ${this._rutasFavoritas}`);
    console.log(`Histórico rutas: ${this._historicoRutas}`);
  }

  /**
  * Getter del atributo _ID
  * @return atributo _ID 
  */
  get ID () {
    return this._ID;
  }

  /**
  * Setter del atributo _ID
  * @param parametro id : number 
  */
  set ID (id : number) {
    this._ID = id;
  }

  /**
  * Getter del atributo _nombre
  * @return atributo _nombre 
  */
  get nombre () {
    return this._nombre;
  }

  /**
  * Setter del atributo _nombre
  * @param parametro nombre : string 
  */
  set nombre (nombre : string) {
    this._nombre = nombre;
  }

  /**
  * Getter del atributo _participantes
  * @return atributo _participantes 
  */
  get participantes () {
    return this._participantes;
  }

  /**
  * Setter del atributo _participantes
  * @param parametro participantes : number[] 
  */
  set participantes (participantes : number[]) {
    this._participantes = participantes;
  }

  /**
  * Getter del atributo _estadisticasEntrenamiento
  * @return atributo _estadisticasEntrenamiento 
  */
  get estadisticasEntrenamiento () {
    return this._estadisticasEntrenamiento;
  }

  /**
  * Setter del atributo _estadisticasEntrenamiento
  * @param parametro estadisticasEntrenamiento : EstadisticasEntrenamiento
  */
  set estadisticasEntrenamiento (estadisticasEntrenamiento : EstadisticasEntrenamiento) {
    this._estadisticasEntrenamiento = estadisticasEntrenamiento;
  }


  /**
  * Getter del atributo _clasificacion
  * @return atributo _clasificacion 
  */
  get clasificacion () {
    return this._clasificacion;
  }

  /**
  * Setter del atributo _clasificacion
  * @param parametro _clasificacion : Usuario[] 
  */
  set clasificacion (clasificacion : Usuario[]) {
    this._clasificacion = clasificacion;
  }


  /**
  * Getter del atributo _rutasFavoritas
  * @return atributo _rutasFavoritas 
  */
  get rutasFavoritas () {
    return this._rutasFavoritas;
  }

  /**
  * Setter del atributo _rutasFavoritas
  * @param parametro _rutasFavoritas : Ruta[] 
  */
  set rutasFavoritas (rutasFavoritas : Ruta[]) {
    this._rutasFavoritas = rutasFavoritas;
  }

  /**
  * Getter del atributo _historicoRutas
  * @return atributo _historicoRutas 
  */
  get historicoRutas () {
    return this._historicoRutas;
  }

  /**
  * Setter del atributo _historicoRutas
  * @param parametro _historicoRutas : Ruta[] 
  */
  set historicoRutas (historicoRutas : Ruta[]) {
    this._historicoRutas = historicoRutas;
  }
}