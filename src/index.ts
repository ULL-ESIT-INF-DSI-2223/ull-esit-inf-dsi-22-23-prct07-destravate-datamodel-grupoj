import * as inquirer from 'inquirer';
import { UsuarioColeccion, AtributosUsuario } from "./usuarios/usuarioColeccion";
import { JsonUsuarioColeccion } from "./usuarios/jsonUsuarioColeccion";
import { JsonRetoColeccion } from "./retos/jsonRetoColeccion";
import { JsonRutaColeccion } from "./rutas/jsonRutaColeccion";
import { Usuario, HistoricoRuta, Coleccion } from './usuarios/usuario';
import { Actividad, Ruta } from './rutas/ruta';
import { EstadisticasEntrenamiento } from './grupos/grupo';
import { promptUsuarios } from './usuarios/usuarioPrompt';
import { promptGrupos } from './grupos/grupoPrompt';
import { promptRetos } from './retos/retoPrompt';

export let jsonUsuariosColeccion = new JsonUsuarioColeccion([]);
export let jsonRutasColeccion = new JsonRutaColeccion([]);
export let jsonRetosColeccion = new JsonRetoColeccion([]);

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
        promptGrupos();
        break;
      case Commands.Retos:
        promptRetos();
        break;
    }
  })
}

promptPrincipal();