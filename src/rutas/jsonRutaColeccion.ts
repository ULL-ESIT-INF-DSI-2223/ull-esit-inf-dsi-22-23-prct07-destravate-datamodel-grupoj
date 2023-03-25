import { RutaColeccion } from "./rutaColeccion";
import { Actividad, Ruta, Coordenada} from "./ruta";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

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

export class JsonRutaColeccion extends RutaColeccion {
  private database: lowdb.LowdbSync<schemaRutas>;

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

  addRuta(nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
          desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {
      
    super.insertarRuta(nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia);
    this.storeTasks();
  }

  removeRuta(ID: number): boolean {
    let borro: boolean = super.borrarRuta(ID);
    this.storeTasks();
    return borro;
  }

  modifyRuta(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
    let modifico: boolean = super.modificarRuta(ID, atributoModificar, nuevoAtributo);
    this.storeTasks();
    return modifico;
  }

  private storeTasks() {
    this.database.set("ruta", [...this._rutas.values()]).write();
  }
}