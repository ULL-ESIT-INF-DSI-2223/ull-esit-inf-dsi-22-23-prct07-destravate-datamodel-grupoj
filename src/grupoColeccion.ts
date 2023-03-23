import { Actividad, Ruta } from "./ruta";
import { Usuario, Coleccion, HistoricoRuta} from "./usuario";
import { Grupo, EstadisticasEntrenamiento } from "./grupo";

/**
 * Clase GrupoColeccion que alberga
 * @param _grupos Colección de grupos
 */
export class GrupoColeccion {
  protected _grupos : Grupo[];
  protected _ultID : number;

  /**
   * Constructor de la clase GrupoColeccion
   * @param grupos Colección de grupos
   */
  constructor(grupos : Grupo[]) {
    this._grupos = grupos;
    if (grupos.length != 0) {
      this._ultID = grupos[grupos.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }

  insertarGrupo(ID : number, nombre : string, participantes : number[], estadisticasEntrenamiento : EstadisticasEntrenamiento,  
    clasificacion : Usuario[], rutasFavoritas : Ruta[], historicoRutas : Ruta[]) {
    this._grupos.push(new Grupo(ID, nombre, participantes, estadisticasEntrenamiento, clasificacion, rutasFavoritas, historicoRutas));
  }
}