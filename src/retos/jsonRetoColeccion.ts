import { RetoColeccion } from "./retoColeccion";
import {Reto} from "./reto";
import { Actividad, Ruta } from "../rutas/ruta";
import { Usuario } from "../usuarios/usuario";
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
        this._ultID = item._ID;
      })
    } else {
      this.database.set("reto", coleccionReto).write();
      coleccionReto.forEach(item => this._retos.push(item));
    }
  }

  addReto(nombre: string, rutas: number[], tipoActividad: Actividad, usuarios: number[]) {
    super.insertarReto(nombre, rutas, tipoActividad, usuarios);
    this.storeTasks();
  }

  removeReto(ID: number): boolean {
    let borro: boolean = super.borrarReto(ID);
    this.storeTasks();
    return borro;
  }

  modifyReto(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
    let modifico: boolean = super.modificarReto(ID, atributoModificar, nuevoAtributo);
    this.storeTasks();
    return modifico;
  }

  private storeTasks() {
    this.database.set("reto", [...this._retos.values()]).write();
  }
}