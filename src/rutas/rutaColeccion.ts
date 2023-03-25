import { Actividad, Coordenada, Ruta } from "./ruta";

/**
 * Clase RutaColeccion que alberga
 * @param _rutas Colección de rutas
 */
export class RutaColeccion {
  protected _rutas: Ruta[];
  /**
   * Constructor de la clase RutaColeccion
   * @param rutas Colección de rutas
   */
  constructor(rutas: Ruta[]) {
    this._rutas = rutas;
  }
  
  insertarRuta(ID: number, nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
    desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {

    this._rutas.push(new Ruta(ID, nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, 
      desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia));
  }

  buscarRutas(rutasIds: number[]) : Ruta[] {
    let rutas: Ruta[] = [];

    this._rutas.forEach(ruta => {
      rutasIds.forEach(rutaId => {
        if(ruta.ID ==  rutaId) {
          rutas.push(ruta);
        }
      })
    })

    return rutas;
  }
}