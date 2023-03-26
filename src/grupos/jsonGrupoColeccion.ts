import { GrupoColeccion, Actividad, Ruta, Usuario, Coleccion, HistoricoRuta, Grupo, EstadisticasEntrenamiento } from "../internal";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";


/**
 * Esquema de la Base de Datos
 */
type schemaGrupos = {
  grupo: { 
    _ID: number; 
    _nombre: string;
    _participantes: number[]; 
    _estadisticasEntrenamiento: EstadisticasEntrenamiento; 
    _clasificacion: Usuario[];
    _rutasFavoritas: number[];
    _historicoRutas: HistoricoRuta[];
    _administrador: number;
  }[];
};

/**
 * Clase que interactura con el fichero JSON, para guardar la información de los Grupos
 */
export class JsonGrupoColeccion extends GrupoColeccion {
  private database: lowdb.LowdbSync<schemaGrupos>;

  /**
   * Constructor de la clase JsonGrupoColeccion
   * @param coleccionGrupo Colección de Grupos
   */
  constructor(coleccionGrupo: Grupo[]) {
    super(coleccionGrupo);

    this.database = lowdb(new FileSync("Grupos.json"));

    if (this.database.has("grupo").value())  {
      let dbItems = this.database.get("grupo").value();
      dbItems.forEach(item => {
        this._grupos.push(new Grupo(item._ID, item._nombre, item._participantes, item._estadisticasEntrenamiento, item._clasificacion, item._rutasFavoritas, item._historicoRutas, item._administrador));
        this._ultID = item._ID;
      })
    } 
    else {
      this.database.set("grupo", coleccionGrupo).write();
      coleccionGrupo.forEach(item => this._grupos.push(item));
    }
  }

  /**
   * Método para insertar un grupo a la colección
   * @param nombre Nombre propio de grupo
   * @param participantes IDs de los miembros del grupo
   * @param estadisticasEntrenamiento Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
   * @param clasificacion Ranking de los grupos que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado
   * @param rutasFavoritas  Rutas que los grupos del grupo han realizado con mayor frecuencia en sus salidas conjuntas
   * @param historicoRutas todas las rutas que ha realizado el grupo en conjunto
  */
  addGrupo(nombre : string, participantes : number[], estadisticasEntrenamiento : EstadisticasEntrenamiento,  
          clasificacion : Usuario[], rutasFavoritas : number[], historicoRutas : HistoricoRuta[], adminID: number = 0) {
      super.insertarGrupo(nombre, participantes, estadisticasEntrenamiento, clasificacion, rutasFavoritas, historicoRutas, adminID);
      this.storeTasks();
  }

  /**
   * Método para eliminar un grupo de la colección
   * @param ID ID unico de cada grupo
   * @returns un valor logico si se pudo elimnar el grupo o no
   */
  removeGrupo(ID: number): boolean {
    let borro: boolean = super.borrarGrupo(ID);
    this.storeTasks();
    return borro;
  }

  /**
  * Método para modificar un atributo de un grupo de la colección
  * @param ID ID único del grupo
  * @param atributoModificar Atributo a modificar
  * @param nuevoAtributo Valor del nuevo atributo
  * @returns un valor logico si se pudo modificar el atributo o no
  */
  modifyGrupo(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
    let modifico: boolean = super.modificarGrupo(ID, atributoModificar, nuevoAtributo);
    this.storeTasks();
    return modifico;
  }

  /**
  * Método para mostrar una serie de atributos de un grupo de la colección
  * @param ordenacion opción de ordenación
  * @param orientacion opción de orientación
  * @returns un valor logico si se pudo mostrar correctamente la información por pantalla
  */
  showGrupo(ordenacion: string, orientacion: string): boolean {
    let muestro: boolean = super.mostrarGrupos(ordenacion, orientacion);
    return muestro;
  }

   /**
   * Método para añadir un usuario a un grupo
   * @param ID_usuario ID del usuario a añadir un amigo
   * @param ID_amigo ID del amigo a insertar
   */
   addUsuario(ID_grupo : number, ID_usuario : number) {
    super.anadirUsuario(ID_grupo, ID_usuario);
    this.storeTasks();
  } 

  /**
   * Método privado para actualizar los valores del fichero JSON, con los de la colección
   */
  private storeTasks() {
    this.database.set("grupo", [...this._grupos.values()]).write();
  }
}