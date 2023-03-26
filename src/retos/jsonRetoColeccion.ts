import { RetoColeccion, Reto, Actividad, Ruta, Usuario } from "../internal";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

/**
 * Esquema de la Base de Datos
 */
type schemaRetos = {
  reto: {
    _ID: number;
    _nombre: string;
    _rutas: Ruta[];
    _tipoActividad: Actividad;
    _kilometrosTotales: number;
    _usuarios: Usuario[];
  }[];
}

/**
 * Clase que interactura con el fichero JSON, para guardar la información de los retos
 */
export class JsonRetoColeccion extends RetoColeccion {
  private database: lowdb.LowdbSync<schemaRetos>;

  /**
   * Constructor de la clase JsonRetoColeccion
   * @param coleccionReto Colección de Retos
   */
  constructor(coleccionReto: Reto[]) {
    super(coleccionReto);

    this.database = lowdb(new FileSync("Retos.json"));
    
    if (this.database.has("reto").value()) {
      let dbItems = this.database.get("reto").value();
      dbItems.forEach(item => {
        this._retos.push(new Reto(item._ID, item._nombre, item._rutas, item._tipoActividad, item._usuarios))
        this._ultID = item._ID;
      })
    } else {
      this.database.set("reto", coleccionReto).write();
      coleccionReto.forEach(item => this._retos.push(item));
    }
  }

  /**
   * Método para insertar un reto a la colección
   * @param nombre Nombre del reto
   * @param rutas Rutas que forman parte del reto
   * @param tipoActividad Tipo de actividad del reto: bicicleta o correr
   * @param usuarios Usuarios que están realizando el reto
   */
  addReto(nombre: string, rutas: number[], tipoActividad: Actividad, usuarios: number[]) {
    super.insertarReto(nombre, rutas, tipoActividad, usuarios);
    this.storeTasks();
  }

  /**
   * Método para eliminar un reto de la colección
   * @param ID ID unico de cada reto
   * @returns un valor logico si se pudo elimnar el reto o no
   */
  removeReto(ID: number): boolean {
    let borro: boolean = super.borrarReto(ID);
    this.storeTasks();
    return borro;
  }

  /**
   * Método para modificar un atributo de un reto de la colección
   * @param ID ID único del reto
   * @param atributoModificar Atributo a modificar
   * @param nuevoAtributo Valor del nuevo atributo
   * @returns un valor logico si se pudo modificar el atributo o no
   */
  modifyReto(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
    let modifico: boolean = super.modificarReto(ID, atributoModificar, nuevoAtributo);
    this.storeTasks();
    return modifico;
  }

  /**
  * Método para mostrar una serie de atributos de un reto de la colección
  * @param ordenacion opción de ordenación
  * @param orientacion opción de orientación
  * @returns un valor logico si se pudo mostrar correctamente la información por pantalla
  */
  showReto(ordenacion: string, orientacion: string): boolean {
    let muestro: boolean = super.mostrarRetos(ordenacion, orientacion);
    return muestro;
  }

  /**
   * Método privado para actualizar los valores del fichero JSON, con los de la colección
   */
  private storeTasks() {
    this.database.set("reto", [...this._retos.values()]).write();
  }
}