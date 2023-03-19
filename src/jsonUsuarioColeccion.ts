import { UsuarioColeccion } from "./usuarioColeccion";
import { Actividad } from "./ruta";
import { Usuario, Coleccion, HistoricoRuta} from "./usuario";
import { EstadisticasEntrenamiento } from "./grupo";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaUsuarios = {
  usuario: { 
    id: number; 
    nombre: string;
    actividades: Actividad; 
    amigosApp: number[]; 
    grupoAmigos: Coleccion;
    entramiento: EstadisticasEntrenamiento;
    rutasFavoritas: number[];
    retosActivos: number[];
    historicoRutas: HistoricoRuta[];
  }[];
};

export class JsonUsuarioColeccion extends UsuarioColeccion {
  private database: lowdb.LowdbSync<schemaUsuarios>;

  constructor(coleccionUsuario: Usuario[]) {
    super(coleccionUsuario);

    this.database = lowdb(new FileSync("Usuarios.json"));
    
    if (this.database.has("usuario").value())  {
      let dbItems = this.database.get("usuario").value();
      dbItems.forEach(item => {
        this._usuarios.push(new Usuario(item.id, item.nombre, item.actividades, item.amigosApp, item.grupoAmigos, item.entramiento, item.rutasFavoritas, item.retosActivos, item.historicoRutas));
      })
    } 
    else {
      this.database.set("usuario", coleccionUsuario).write();
      coleccionUsuario.forEach(item => this._usuarios.push(item));
    }
  }

  addUsuario(ID: number, nombre: string, actividades: Actividad, amigosApp: number[],
             grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, rutasFavoritas: number[],
             retosActivos: number[], historicoRutas: HistoricoRuta[]) {

    super.insertarUsuario(ID, nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas);
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
    this.database.set("tasks", [...this._usuarios.values()]).write();
  }
}