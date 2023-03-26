import * as inquirer from 'inquirer';
import { JsonUsuarioColeccion } from '../src/usuarios/jsonUsuarioColeccion';
import { Usuario } from '../src/usuarios/usuario';
import { JsonGrupoColeccion } from '../src/grupos/jsonGrupoColeccion';
import { JsonRutaColeccion } from '../src/rutas/jsonRutaColeccion';
import { JsonRetoColeccion } from '../src/retos/jsonRetoColeccion';
import { insertarUsuarioPrompt, mostrarUsuarioPrompt } from './usuarios/usuarioPrompt';
import { promptPrincipal, pantallaPrincipal } from './index';
import { CommandsEach, Commands } from '.';
import { mostrarRutaPrompt } from './rutas/rutaPrompt';
import { mostrarGrupoPrompt, insertarGrupoPrompt, eliminarGrupoPrompt } from './grupos/grupoPrompt';
enum LogIn { 
  Login = "Iniciar sesión",
  Registrarse = "Registrarse"
}

export class Gestor {
  private UsuarioRegistradoID: number = 0;
  private enGrupo:boolean = false;
  constructor(private _usuarios : JsonUsuarioColeccion, private _grupos : JsonGrupoColeccion,
                      private _rutas : JsonRutaColeccion, private _retos : JsonRetoColeccion) {
  }

  registrarse() : void {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "command",
      message: "¿Qué quieres hacer?: ",
      choices: Object.values(LogIn)
    }).then(respuestas => {
      switch (respuestas["command"]) {
        case LogIn.Login:
            inquirer.prompt([  
            {
              type: "input",
              name: "checkID",
              message: "Login (ID): ",
            }
            ]).then(respuesta => {
              if (this._usuarios.existeUsuario(Number(respuesta["checkID"]))) { 
                this.UsuarioRegistradoID = Number(respuesta["checkID"]);
                pantallaPrincipal("Sesion iniciada");
              } else {
                this.UsuarioRegistradoID = this._usuarios.ultID + 1;
                insertarUsuarioPrompt(0);
              }
            })
        break;

        case LogIn.Registrarse:
          this.UsuarioRegistradoID = this._usuarios.ultID + 1;
          insertarUsuarioPrompt(0);
      }
    })
  }

  añadirAmigo() : void {
    inquirer.prompt([  
    {
      type: "input",
      name: "addAmigo",
      message: "Introducir ID del amigo a introducir: ",
    }
    ]).then(respuesta => {
      if (this._usuarios.existeUsuario(Number(respuesta["addAmigo"]))) {
        this._usuarios.addAmigo(this.UsuarioRegistradoID, Number(respuesta["addAmigo"]));
        pantallaPrincipal("Amigo añadido")
      } else {
        pantallaPrincipal("No existe el ID")
      }
    })
  }

  eliminarAmigo() : void {
    inquirer.prompt([  
    {
      type: "input",
      name: "removeAmigo",
      message: "Introducir ID del amigo a eliminar: ",
    }
    ]).then(respuesta => {
      if (this._usuarios.existeUsuario(Number(respuesta["removeAmigo"]))) {
        this._usuarios.removeAmigo(this.UsuarioRegistradoID, Number(respuesta["removeAmigo"]));
        pantallaPrincipal("Amigo eliminado")
      } else {
        pantallaPrincipal("No existe el ID")
      }
    })
  }

  visualizarUsuarios() : void {
    mostrarUsuarioPrompt(0);
  }

  visualizarRutas () : void {
    mostrarRutaPrompt(0);
  }

  unirseGrupo () : void {
    inquirer.prompt([  
      {
        type: "input",
        name: "addUsuario",
        message: "Introducir ID del grupo a unirse: ",
      }
      ]).then(respuesta => {
        if (this._grupos.existeGrupo(Number(respuesta["addUsuario"]))) {
          this._grupos.addUsuario(Number(respuesta["addUsuario"]), this.UsuarioRegistradoID);
          pantallaPrincipal("El usuario se ha añadido al grupo");
        } else {
          pantallaPrincipal("No existe el ID");
        }
    })
  }
  
  visualizarGrupo () : void {
    mostrarGrupoPrompt(0);
  }
  
  crearGrupo () : void {
    insertarGrupoPrompt(0, this.UsuarioRegistradoID);
  }

  borrarGrupo () : void {
    eliminarGrupoPrompt(0, this.UsuarioRegistradoID);
  }
}