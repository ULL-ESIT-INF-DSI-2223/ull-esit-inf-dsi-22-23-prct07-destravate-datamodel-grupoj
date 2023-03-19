import { Usuario, HistoricoRuta, Coleccion } from "./usuario";
import { EstadisticasEntrenamiento } from "./grupo";
import { Actividad } from "./ruta";

/**
 * Clase UsuarioColeccion que alberga
 * @param _usuarios Colección de usuarios
 */
export class UsuarioColeccion {
  protected _usuarios: Usuario[];
  /**
   * Constructor de la clase UsuarioColeccion
   * @param usuarios Colección de usuarios
   */
  constructor( usuarios: Usuario[]) {
    this._usuarios = usuarios;
  }

  mostrarUsuarios () : void { 
    this._usuarios.sort((a, b) => a.ID - b.ID);    
    this._usuarios.forEach(usuario => {
      usuario.mostrarUsuario();
      console.log('\n');
    });
  }

  insertarUsuario(ID: number, nombre: string, actividades: Actividad, amigosApp: number[],
                  grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, rutasFavoritas: number[],
                  retosActivos: number[], historicoRutas: HistoricoRuta[]) {
    this._usuarios.push(new Usuario(ID, nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas));
  }

  borrarUsuario () {

  }


}