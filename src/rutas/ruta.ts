type LetraCoordenada = 'N' | 'S' | 'E' | 'O';
export type Coordenada = [number, number, number, LetraCoordenada];
export type Actividad = 'Correr' | 'Bicicleta';

/**
 * Clase Ruta que alberga información de una ruta
 * @param _ID ID único de la ruta
 * @param _nombre Nombre de la ruta
 * @param _geolocalizacionInicio Geolocalización del inicio (coordenadas)
 * @param _geolocalizacionFinal Geolocalización del final de la ruta (coordenadas)
 * @param _longitud Longitud de la ruta en kilometros
 * @param _desnivelMedio Desnivel medio de la ruta
 * @param _usuariosRealizaron Usuarios que han realizado la ruta (IDs)
 * @param _tipoActividad Tipo de actividad: bicicleta o correr
 * @param _calificacionMedia Calificación media de la ruta
 */
export class Ruta {
  private _ID: number;
  private _nombre: string;
  private _geolocalizacionInicio: Coordenada;
  private _geolocalizacionFinal: Coordenada;
  private _longitud: number;
  private _desnivelMedio: number;
  private _usuariosRealizaron: number[];
  private _tipoActividad: Actividad;
  private _calificacionMedia: number;

  /**
   * Constructor de la clase Ruta
   * @param ID ID único de la ruta
   * @param nombre Nombre de la ruta
   * @param geolocalizacionInicio Geolocalización del inicio (coordenadas)
   * @param geolocalizacionFinal Geolocalización del final de la ruta (coordenadas)
   * @param longitud Longitud de la ruta en kilometros
   * @param desnivelMedio Desnivel medio de la ruta
   * @param usuariosRealizaron Usuarios que han realizado la ruta (IDs)
   * @param tipoActividad Tipo de actividad: bicicleta o correr
   * @param calificacionMedia Calificación media de la ruta
   */
  constructor(ID: number, nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
              desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {
    this._ID = ID;
    this._nombre = nombre;
    this._geolocalizacionInicio = geolocalizacionInicio;
    this._geolocalizacionFinal = geolocalizacionFinal;
    this._longitud = longitud;
    this._desnivelMedio = desnivelMedio;
    this._usuariosRealizaron = usuariosRealizaron;
    this._tipoActividad = tipoActividad;
    this._calificacionMedia = calificacionMedia;
  }

  /**
   * Muestra los atributos de ruta
   */
  mostrarRuta () : void {
    console.log(`ID: ${this._ID}`);
    console.log(`Nombre: ${this._nombre}`);
    console.log(`geolocalizacionInicio: ${this._geolocalizacionInicio}`);
    console.log(`Longitud: ${this._longitud}`);
    console.log(`Desnivel Medio: ${this._desnivelMedio}`);
    console.log(`Usuarios que la realizaron: ${this._usuariosRealizaron}`);
    console.log(`Tipo de Actividad: ${this._tipoActividad}`);
    console.log(`Calificación Media: ${this._calificacionMedia}`);
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
   * @param ID ID único de la ruta
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
   * @param nombre Nombre de la ruta
   */
  set nombre(nombre: string) {
    this._nombre = nombre;
  }


  /**
   * Getter del atributo _geolocalizacionInicio
   * @return atributo _geolocalizacionInicio
   */
  get geolocalizacionInicio() {
    return this._geolocalizacionInicio;
  }
  /**
   * Setter del atributo _geolocalizacionInicio
   * @param geolocalizacionInicio Geolocalización del inicio (coordenadas)
   */
  set geolocalizacionInicio(geolocalizacionInicio: Coordenada) {
    this._geolocalizacionInicio = geolocalizacionInicio;
  }


  /**
   * Getter del atributo _geolocalizacionFinal
   * @return atributo _geolocalizacionFinal
   */
  get geolocalizacionFinal() {
    return this._geolocalizacionFinal;
  }
  /**
   * Setter del atributo _geolocalizacionFinal
   * @param geolocalizacionFinal Geolocalización del final de la ruta (coordenadas)
   */
  set geolocalizacionFinal(geolocalizacionFinal: Coordenada) {
    this._geolocalizacionFinal = geolocalizacionFinal;
  }


  /**
   * Getter del atributo _longitud
   * @return atributo _longitud
   */
  get longitud() {
    return this._longitud;
  }
  /**
   * Setter del atributo _longitud
   * @param longitud Longitud de la ruta en kilómetros
   */
  set longitud(longitud: number) {
    this._longitud = longitud;
  }


  /**
   * Getter del atributo _desnivelMedio
   * @return atributo _desnivelMedio
   */
  get desnivelMedio() {
    return this._desnivelMedio;
  }
  /**
   * Setter del atributo _desnivelMedio
   * @param desnivelMedio Desnivel medio de la ruta
   */
  set desnivelMedio(desnivelMedio: number) {
    this._desnivelMedio = desnivelMedio;
  }


  /**
   * Getter del atributo _usuariosRealizaron
   * @return atributo _usuariosRealizaron
   */
  get usuariosRealizaron() {
    return this._usuariosRealizaron;
  }
  /**
   * Setter del atributo _usuariosRealizaron
   * @param usuariosRealizaron Usuarios que han realizado la ruta (IDs)
   */
  set usuariosRealizaron(usuariosRealizaron: number[]) {
    this._usuariosRealizaron = usuariosRealizaron;
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
   * @param tipoActividad Tipo de actividad: bicicleta o correr
   */
  set tipoActividad(tipoActividad: Actividad) {
    this._tipoActividad = tipoActividad;
  }


  /**
   * Getter del atributo _calificacionMedia
   * @return atributo _calificacionMedia
   */
  get calificacionMedia() {
    return this._calificacionMedia;
  }
  /**
   * Setter del atributo _calificacionMedia
   * @param calificacionMedia Calificación media de la ruta
   */
  set calificacionMedia(calificacionMedia: number) {
    this._calificacionMedia = calificacionMedia;
  }
}