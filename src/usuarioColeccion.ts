import { Usuario, HistoricoRuta, Coleccion } from "./usuario";
import { EstadisticasEntrenamiento } from "./grupo";
import { Actividad } from "./ruta";

/**
 * Clase UsuarioColeccion que alberga
 * @param _usuarios Colección de usuarios
 * @param _ultID 
 */
export class UsuarioColeccion {
  protected _usuarios: Usuario[];
  protected _ultID: number;
  /**
   * Constructor de la clase UsuarioColeccion
   * @param usuarios Colección de usuarios
   */
  constructor(usuarios: Usuario[]) {
    this._usuarios = usuarios;
    if (usuarios.length != 0) {
      this._ultID = usuarios[usuarios.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }

  mostrarUsuarios () : void { 
    //this._usuarios.sort((a, b) => a.ID - b.ID);    
    this._usuarios.forEach(usuario => {
      usuario.mostrarUsuario();
      console.log('\n');
    });
  }

  insertarUsuario(nombre: string, actividades: Actividad, amigosApp: number[],
                  grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, rutasFavoritas: number[],
                  retosActivos: number[], historicoRutas: HistoricoRuta[]) {
    this._usuarios.push(new Usuario(++this._ultID, nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas));
  }

  borrarUsuario () {

  }


}