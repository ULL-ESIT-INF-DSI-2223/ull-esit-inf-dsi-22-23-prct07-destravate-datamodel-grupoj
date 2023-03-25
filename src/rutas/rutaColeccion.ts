import { Actividad, Coordenada, Ruta } from "./ruta";

/**
 * Clase RutaColeccion que alberga
 * @param _rutas Colección de rutas
 * @param _ultID Ultimo ID usado
 */
export class RutaColeccion {
  protected _rutas: Ruta[];
  protected _ultID: number;

  /**
   * Constructor de la clase RutaColeccion
   * @param rutas Colección de rutas
   */
  constructor(rutas: Ruta[]) {
    this._rutas = rutas;
    if (rutas.length != 0) {
      this._ultID = rutas[rutas.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }
  
  insertarRuta(nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
               desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {

    this._rutas.push(new Ruta(++this._ultID, nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia));
  }

  borrarRuta(ID: number) : boolean {
    return false;
  }

  modificarRuta(ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
    return false;
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