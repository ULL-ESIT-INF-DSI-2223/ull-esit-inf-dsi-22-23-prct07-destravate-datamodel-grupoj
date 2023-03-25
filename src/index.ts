import * as inquirer from 'inquirer';
import { UsuarioColeccion, AtributosUsuario } from "./usuarios/usuarioColeccion";
import { JsonUsuarioColeccion } from "./usuarios/jsonUsuarioColeccion";
import { JsonRetoColeccion } from "./retos/jsonRetoColeccion";
import { JsonRutaColeccion } from "./rutas/jsonRutaColeccion";
import { JsonGrupoColeccion } from './grupos/jsonGrupoColeccion';
import { Usuario, HistoricoRuta, Coleccion } from './usuarios/usuario';
import { Actividad, Ruta } from './rutas/ruta';
import { EstadisticasEntrenamiento } from './grupos/grupo';
import { promptUsuarios } from './usuarios/usuarioPrompt';
import { promptGrupos } from './grupos/grupoPrompt';
import { promptRutas } from './rutas/rutaPrompt';
import { promptRetos } from './retos/retoPrompt';

export let jsonUsuariosColeccion = new JsonUsuarioColeccion([]);
export let jsonRutasColeccion = new JsonRutaColeccion([]);
export let jsonRetosColeccion = new JsonRetoColeccion([]);
export let jsonGruposColeccion = new JsonGrupoColeccion([]);

enum Commands {
  Usuarios = "Usuarios",
  Grupos = "Grupos",
  Rutas = "Rutas", 
  Retos = "Retos",
  Salir = "Salir"
}

export enum CommandsEach {
  Mostrar = "Mostrar",
  Insertar = "Insertar",
  Modificar = "Modificar",
  Eliminar = "Eliminar", 
  Atras = "Atras"
}

export enum AtributosMostrar {
  Volver = 'Volver al menú'
}

export enum AtributosOrdenacionOrientacion {
  Ascendente = 'Ordenación ascendente',
  Descendente = 'Ordenación descendente'
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
      case Commands.Rutas:
        promptRutas();
        break;
      case Commands.Retos:
        promptRetos();
        break;
    }
  })
}

promptPrincipal();