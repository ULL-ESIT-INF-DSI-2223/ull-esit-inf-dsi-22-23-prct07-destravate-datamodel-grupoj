import { GrupoColeccion } from "./grupoColeccion";
import { Actividad, Ruta } from "../rutas/ruta";
import { Usuario, Coleccion, HistoricoRuta} from "../usuarios/usuario";
import { Grupo, EstadisticasEntrenamiento } from "./grupo";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaGrupos = {
  grupo: { 
    _ID: number; 
    _nombre: string;
    _participantes: number[]; 
    _estadisticasEntrenamiento: EstadisticasEntrenamiento; 
    _clasificacion: Usuario[];
    _rutasFavoritas: Ruta[];
    _historicoRutas: Ruta[];
  }[];
};

export class JsonGrupoColeccion extends GrupoColeccion {
  private database: lowdb.LowdbSync<schemaGrupos>;

  constructor(coleccionGrupo: Grupo[]) {
    super(coleccionGrupo);

    this.database = lowdb(new FileSync("Grupos.json"));
    
    if (this.database.has("grupo").value())  {
      let dbItems = this.database.get("grupo").value();
      dbItems.forEach(item => {
        this._grupos.push(new Grupo(item._ID, item._nombre, item._participantes, item._estadisticasEntrenamiento, item._clasificacion, item._rutasFavoritas, item._historicoRutas));
        this._ultID = item._ID;
      })
    } 
    else {
      this.database.set("grupo", coleccionGrupo).write();
      coleccionGrupo.forEach(item => this._grupos.push(item));
    }
  }

  addGrupo(ID : number, nombre : string, participantes : number[], estadisticasEntrenamiento : EstadisticasEntrenamiento,  
    clasificacion : Usuario[], rutasFavoritas : Ruta[], historicoRutas : Ruta[]) {
    super.insertarGrupo(ID, nombre, participantes, estadisticasEntrenamiento, clasificacion, rutasFavoritas, historicoRutas);
    this.storeTasks();
  }
  /*markComplete(id: number, complete: boolean): void {
      super.markComplete(id, complete);
      this.storeTasks();
  }
  removeComplete(): void {
      super.removeComplete();
      this.storeTasks();
  }*/
  private storeTasks() {
    this.database.set("grupo", [...this._grupos.values()]).write();
  }
}