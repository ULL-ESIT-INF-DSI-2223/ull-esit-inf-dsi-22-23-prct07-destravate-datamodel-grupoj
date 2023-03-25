import * as inquirer from 'inquirer';
import { UsuarioColeccion, AtributosUsuario } from "./usuarios/usuarioColeccion";
import { JsonUsuarioColeccion } from "./usuarios/jsonUsuarioColeccion";
import { Usuario, HistoricoRuta, Coleccion } from './usuarios/usuario';
import { Actividad, Ruta } from './rutas/ruta';
import { EstadisticasEntrenamiento } from './grupos/grupo';
import { promptUsuarios } from './usuarios/usuarioPrompt';
import { promptGrupos } from './grupos/grupoPrompt';

enum Commands {
  Usuarios = "Usuarios",
  Grupos = "Grupos",
  Rutas = "Rutas", 
  Retos = "Retos",
  Salir = "Salir"
}

export enum CommandsEach {
  Insertar = "Insertar",
  Modificar = "Modificar",
  Eliminar = "Eliminar", 
  Atras = "Atras"
}

export function promptPrincipal(mensaje = "") {
  console.clear();
  console.log(mensaje);
  //jsonUsuariosColeccion.mostrarUsuarios()  

  inquirer.prompt({
    type: "list",
    name: "command",
    message: "¿Qué quieres hacer?: ",
    choices: Object.values(Commands),
  }).then(answers => {
    switch (answers["command"]) {
      case Commands.Usuarios:
        promptUsuarios();
        break;
      case Commands.Grupos:
        promptGrupos;
        break;
    }
  })
}

promptPrincipal();