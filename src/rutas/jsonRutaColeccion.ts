import { RutaColeccion } from "./rutaColeccion";
import { Actividad, Ruta, Coordenada} from "./ruta";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

/**
 * Esquema de la Base de Datos
 */
type schemaRutas = {
  ruta: {
    _ID: number;
    _nombre: string;
    _geolocalizacionInicio: Coordenada;
    _geolocalizacionFinal: Coordenada;
    _longitud: number;
    _desnivelMedio: number;
    _usuariosRealizaron: number[];
    _tipoActividad: Actividad;
    _calificacionMedia: number;
  }[];
}

/**
 * Clase que interactura con el fichero JSON, para guardar la información de las Rutas
 */
export class JsonRutaColeccion extends RutaColeccion {
  private database: lowdb.LowdbSync<schemaRutas>;

  /**
   * Constructor de la clase JsonRutaColeccion
   * @param coleccionRuta Colección de Rutas
   */
  constructor(coleccionRuta: Ruta[]) {
    super(coleccionRuta);

    this.database = lowdb(new FileSync("Rutas.json"));

    if (this.database.has("ruta").value()) {
      let dbItems = this.database.get("ruta").value();
      dbItems.forEach(item => {
        this._rutas.push(new Ruta(item._ID, item._nombre, item._geolocalizacionInicio, item._geolocalizacionFinal, item._longitud, item._desnivelMedio, item._usuariosRealizaron, item._tipoActividad, item._calificacionMedia))
        this._ultID = item._ID;
      })
    } else {
      this.database.set("ruta", coleccionRuta).write();
      coleccionRuta.forEach(item => this._rutas.push(item));
    }
  }

  /**
   * Método para insertar una ruta a la colección
   * @param nombre Nombre de la ruta
   * @param geolocalizacionInicio Geolocalización del inicio (coordenadas)
   * @param geolocalizacionFinal Geolocalización del final de la ruta (coordenadas)
   * @param longitud Longitud de la ruta en kilometros
   * @param desnivelMedio Desnivel medio de la ruta
   * @param usuariosRealizaron Usuarios que han realizado la ruta (IDs)
   * @param tipoActividad Tipo de actividad: bicicleta o correr
   * @param calificacionMedia Calificación media de la ruta
   */
  addRuta(nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
          desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {
      
    super.insertarRuta(nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia);
    this.storeTasks();
  }

  /**
   * Método para eliminar una ruta de la colección
   * @param ID ID unico de cada ruta
   * @returns un valor logico si se pudo elimnar la ruta o no
   */
  removeRuta(ID: number): boolean {
    let borro: boolean = super.borrarRuta(ID);
    this.storeTasks();
    return borro;
  }

  /**
   * Método para modificar un atributo de una ruta de la colección
   * @param ID ID único de la ruta
   * @param atributoModificar Atributo a modificar
   * @param nuevoAtributo Valor del nuevo atributo
   * @returns un valor logico si se pudo modificar el atributo o no
   */
  modifyRuta(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
    let modifico: boolean = super.modificarRuta(ID, atributoModificar, nuevoAtributo);
    this.storeTasks();
    return modifico;
  }

  /**
  * Método para mostrar una serie de atributos de una ruta de la colección
  * @param ordenacion opción de ordenación
  * @param orientacion opción de orientación
  * @returns un valor logico si se pudo mostrar correctamente la información por pantalla
  */
  showRuta(ordenacion: string, orientacion: string): boolean {
    //let muestro: boolean = super.mostrarRutas(ordenacion, orientacion);
    this.storeTasks();
    //return muestro;
    return false;
  }

  /**
   * Método privado para actualizar los valores del fichero JSON, con los de la colección
   */
  private storeTasks() {
    this.database.set("ruta", [...this._rutas.values()]).write();
  }
}