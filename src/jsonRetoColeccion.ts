import { RetoColeccion } from "./retoColeccion";
import {Reto} from "./reto";
import { Actividad, Ruta } from "./ruta";
import { Usuario } from "./usuario";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

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

export class JsonRetoColeccion extends RetoColeccion {
  private database: lowdb.LowdbSync<schemaRetos>;

  constructor(coleccionReto: Reto[]) {
    super(coleccionReto);

    this.database = lowdb(new FileSync("Retos.json"));
    
    if (this.database.has("reto").value()) {
      let dbItems = this.database.get("reto").value();
      dbItems.forEach(item => {
        this._retos.push(new Reto(item._ID, item._nombre, item._rutas, item._tipoActividad, item._usuarios))
      })
    } else {
      this.database.set("reto", coleccionReto).write();
      coleccionReto.forEach(item => this._retos.push(item));
    }
  }

  addReto(id : number, nombre : string, rutas : Ruta[], tipoActividad : Actividad, usuarios : Usuario[]) {
    super.insertarReto(id, nombre, rutas, tipoActividad, usuarios);
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
    this.database.set("reto", [...this._retos.values()]).write();
  }
}