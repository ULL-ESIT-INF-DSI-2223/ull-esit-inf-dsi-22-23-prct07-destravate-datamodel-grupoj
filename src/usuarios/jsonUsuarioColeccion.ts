import { UsuarioColeccion } from "./usuarioColeccion";
import { Actividad } from "../rutas/ruta";
import { Usuario, Coleccion, HistoricoRuta} from "./usuario";
import { EstadisticasEntrenamiento } from "../grupos/grupo";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

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

export class JsonUsuarioColeccion extends UsuarioColeccion {
  private database: lowdb.LowdbSync<schemaUsuarios>;

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

  addUsuario(nombre: string, actividades: Actividad, amigosApp: number[],
             grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, rutasFavoritas: number[],
             retosActivos: number[], historicoRutas: HistoricoRuta[]) {

    super.insertarUsuario(nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas);
    this.storeTasks();
  }
  
  removeUsuario(ID: number): boolean {
    let borro: boolean = super.borrarUsuario(ID);
    this.storeTasks();
    return borro;
  }

  modifyUsuario(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
    let modifico: boolean = super.modificarUsuario(ID, atributoModificar, nuevoAtributo);
    this.storeTasks();
    return modifico;
  }

  private storeTasks() {
    this.database.set("usuario", [...this._usuarios.values()]).write();
  }
}