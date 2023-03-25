import { UsuarioColeccion } from "./usuarioColeccion";
import { Actividad } from "../rutas/ruta";
import { Usuario, Coleccion, HistoricoRuta} from "./usuario";
import { EstadisticasEntrenamiento } from "../grupos/grupo";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

/**
 * Esquema de la Base de Datos
 */
type schemaUsuarios = {
  usuario: { 
    _ID: number; 
    _nombre: string;
    _actividades: Actividad; 
    _amigosApp: number[]; 
    _grupoAmigos: Coleccion;
    _entrenamiento: EstadisticasEntrenamiento;
    _rutasFavoritas: number[];
    _retosActivos: number[];
    _historicoRutas: HistoricoRuta[];
  }[];
};

/**
 * Clase que interactura con el fichero JSON, para guardar la información de los Usuarios
 */
export class JsonUsuarioColeccion extends UsuarioColeccion {
  private database: lowdb.LowdbSync<schemaUsuarios>;

  /**
   * Constructor de la clase JsonUsuarioColeccion
   * @param coleccionUsuario Colección de Usuarios
   */
  constructor(coleccionUsuario: Usuario[]) {
    super(coleccionUsuario);

    this.database = lowdb(new FileSync("Usuarios.json"));
    
    if (this.database.has("usuario").value())  {
      let dbItems = this.database.get("usuario").value();
      dbItems.forEach(item => {
        this._usuarios.push(new Usuario(item._ID, item._nombre, item._actividades, item._amigosApp, item._grupoAmigos, item._entrenamiento, item._rutasFavoritas, item._retosActivos, item._historicoRutas));
        this._ultID = item._ID;
      })
    } 
    else {
      this.database.set("usuario", coleccionUsuario).write();
      coleccionUsuario.forEach(item => this._usuarios.push(item));
    }
  }

  /**
   * Método para insertar un usuario a la colección
   * @param nombre Nombre propio de usuario
   * @param actividades Tipo de actividad: correr o bicicleta
   * @param amigosApp Colleción de IDs de usuarios con los que se interacciona
   * @param grupoAmigos  Diferentes colecciones de IDs de usuarios con los que suele realizar rutas
   * @param entrenamiento Cantidad de km y desnivel total acumulados en la semana, mes y año
   * @param rutasFavoritas Colección de IDs de las rutas que el usuario ha realizado con mayor frecuencia
   * @param retosActivos Colección de IDs de los retos que el usuario está realizando actualmente
   * @param historicoRutas Colección del historial de rutas realizadas 
   */
  addUsuario(nombre: string, actividades: Actividad, amigosApp: number[],
             grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, rutasFavoritas: number[],
             retosActivos: number[], historicoRutas: HistoricoRuta[]) {

    super.insertarUsuario(nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas);
    this.storeTasks();
  }
  
  /**
   * Método para eliminar un usuario de la colección
   * @param ID ID unico de cada usuario
   * @returns un valor logico si se pudo elimnar el usuario o no
   */
  removeUsuario(ID: number): boolean {
    let borro: boolean = super.borrarUsuario(ID);
    this.storeTasks();
    return borro;
  }

  /**
   * Método para modificar un atributo de un usuario de la colección
   * @param ID ID único del usuario
   * @param atributoModificar Atributo a modificar
   * @param nuevoAtributo Valor del nuevo atributo
   * @returns un valor logico si se pudo modificar el atributo o no
   */
  modifyUsuario(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
    let modifico: boolean = super.modificarUsuario(ID, atributoModificar, nuevoAtributo);
    this.storeTasks();
    return modifico;
  }

  /**
   * Método privado para actualizar los valores del fichero JSON, con los de la colección
   */
  private storeTasks() {
    this.database.set("usuario", [...this._usuarios.values()]).write();
  }
}