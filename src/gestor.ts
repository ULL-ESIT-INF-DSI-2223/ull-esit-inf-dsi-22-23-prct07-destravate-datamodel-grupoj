import * as inquirer from 'inquirer';
import { JsonUsuarioColeccion, JsonGrupoColeccion, JsonRutaColeccion, JsonRetoColeccion } from './internal';
import { insertarUsuarioPrompt, mostrarUsuarioPrompt, pantallaPrincipal} from './internal';
import { mostrarGrupoPrompt, insertarGrupoPrompt, eliminarGrupoPrompt, mostrarRutaPrompt } from './internal';

enum LogIn { 
  Login = "Iniciar sesión",
  Registrarse = "Registrarse"
}

/**
 * Clase Gestor 
 * para gestionar el tratamiento de la información del sistema
 * @param UsuarioRegistradoID almacena la última ID empleada en un usuario registrado en el sistema
 */
export class Gestor {
  private UsuarioRegistradoID: number = 0;
  constructor(private _usuarios : JsonUsuarioColeccion, private _grupos : JsonGrupoColeccion,
                      private _rutas : JsonRutaColeccion, private _retos : JsonRetoColeccion) {}

  /**
   * Función que posibilita a un usuario registrarte
   * en el sistema, solicitando para ello una serie de atributos requeridos
   */                  
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

  /**
   * Clase para que un usuario pueda añadir un amigo a su lista
   * de amigos
   */
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

  /**
   * Función para que un usuario pueda
   * eliminar a un usuario de su lista de amistades
   */
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

  /**
   * Función para visualizar los distintos usuarios siguiendo criterios
   * de ordenación indicados por el usuario, según una lista de opciones
   */
  visualizarUsuarios() : void {
    mostrarUsuarioPrompt(0);
  }

  /**
   * Función para visualizar las distintos rutas siguiendo criterios
   * de ordenación indicados por el usuario, según una lista de opciones
   */
  visualizarRutas() : void {
    mostrarRutaPrompt(0);
  }

  /**
   * Función para que un usuario se pueda unir a un determinado grupo
   */
  unirseGrupo() : void {
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
  
  /**
   * Función para visualizar los grupos siguiendo criterios
   * de ordenación indicados por el usuario, según una lista de opciones
   */
  visualizarGrupo() : void {
    mostrarGrupoPrompt(0);
  }
  
  /**
   * Función para crear un grupo, solicitando los datos necesarios
   * para construirlo
   */
  crearGrupo() : void {
    insertarGrupoPrompt(0, this.UsuarioRegistradoID);
  }

  /**
   * Función para borrar un grupo, solicitando la ID del mismo
   */
  borrarGrupo() : void {
    eliminarGrupoPrompt(0, this.UsuarioRegistradoID);
  }
}