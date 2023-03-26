import { UsuarioColeccion } from '../src/usuarios/usuarioColeccion';
import { GrupoColeccion } from '../src/grupos/grupoColeccion';
import { RutaColeccion } from '../src/rutas/rutaColeccion';
import { RetoColeccion } from '../src/retos/retoColeccion';
import { insertarUsuarioPrompt } from './usuarios/usuarioPrompt';
// import { }
export class Gestor {
  
  constructor(private _usuarios : UsuarioColeccion, private _grupos : GrupoColeccion,
                      private _rutas : RutaColeccion, private _retos : RetoColeccion) {
  }

  Registrarse () : void {
    let sign = prompt('ID: ', );
    if (this._usuarios.existeUsuario(Number(sign))) {

    } else {
      insertarUsuarioPrompt();
    }
  }

  VisualizarRutas () : void {

  }

  UnirseGrupo () : void {

  }
  
  VisualizarGrupo () : void {

  }
  
  CrearGrupo () : void {

  }

  BorrarGrupo () : void {

  }
}