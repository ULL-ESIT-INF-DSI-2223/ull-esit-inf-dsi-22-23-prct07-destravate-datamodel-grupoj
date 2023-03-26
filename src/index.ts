import * as inquirer from 'inquirer';
import { JsonUsuarioColeccion, JsonRetoColeccion, JsonRutaColeccion, JsonGrupoColeccion } from "./internal";
import { promptUsuarios, promptGrupos, promptRutas, promptRetos } from './internal';
import { Gestor } from './internal'

export let jsonUsuariosColeccion = new JsonUsuarioColeccion([]);
export let jsonRutasColeccion = new JsonRutaColeccion([]);
export let jsonRetosColeccion = new JsonRetoColeccion([]);
export let jsonGruposColeccion = new JsonGrupoColeccion([]);
let myGestor = new Gestor(jsonUsuariosColeccion, jsonGruposColeccion, jsonRutasColeccion, jsonRetosColeccion);

export enum Commands { 
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

/**
 * Función que desarrolla el prompt principal,
 * encargado de gestionar el menú principal
 * para llamar a las distintas funcionalidades
 * @param mensaje en caso de que una función desee retornar un mensaje de éxito o error, al final su ejecucción
 */
export function promptPrincipal(mensaje = "") {
  console.clear();
  console.log(mensaje);

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


export enum CommandsGestor { 
  ListadoUsuarios = "Ver listado de usuarios en el sistema",
  Amigos = "Amigos",
  Grupos = "Grupos",
  VerRutas = "Visualizar todas las rutas",
  Salir = "Salir"
}

export enum CommandsGrupos { 
  Unirse = "Unirse al grupo",
  Visualizar = "Visualizar",
  Crear = "Crear",
  Borrar = "Borrar", 
  Salir = "Salir"
}

export enum CommandsAmigos { 
  Anadir = "Añadir amigo",
  Borrar = "Borrar amigo",
  Salir = "Salir"
}


/**
 * Función que desarrolla el prompt con el que interactuarán los usuarios,
 * encargado de gestionar el menú principal con las opciones pertinentes
 * @param mensaje en caso de que una función desee retornar un mensaje de éxito o error, al final su ejecucción
 */
export function pantallaPrincipal(mensaje = "") : void {
  console.clear();
  console.log(mensaje);
 
  inquirer.prompt({
    type: "list",
    name: "command",
    message: "¿Qué quieres hacer?: ",
    choices: Object.values(CommandsGestor),
  }).then(answers => {
    switch (answers["command"]) {
      case CommandsGestor.ListadoUsuarios:
        myGestor.visualizarUsuarios();
        break;
        
      case CommandsGestor.Amigos:
        inquirer.prompt({
          type: "list",
          name: "command",
          message: "¿Qué quieres hacer?: ",
          choices: Object.values(CommandsAmigos),
        }).then(answers => {
          switch (answers["command"]) {
            case CommandsAmigos.Anadir:
              myGestor.añadirAmigo();
              break;
            case CommandsAmigos.Borrar:
              myGestor.eliminarAmigo();
              break;
            case CommandsGrupos.Salir:
              pantallaPrincipal();
              break;
          }
        })
        break;

      case CommandsGestor.Grupos:
        inquirer.prompt({
          type: "list",
          name: "command",
          message: "¿Qué quieres hacer?: ",
          choices: Object.values(CommandsGrupos),
        }).then(answers => {
          switch (answers["command"]) {
            case CommandsGrupos.Crear:
              myGestor.crearGrupo();
              break;
            case CommandsGrupos.Borrar:
              myGestor.borrarGrupo();
              break;
            case CommandsGrupos.Unirse:
              myGestor.unirseGrupo();
              break;
            case CommandsGrupos.Visualizar:
              myGestor.visualizarGrupo();
              break;
            case CommandsGrupos.Salir:
              pantallaPrincipal();
              break;
          }
        })
        break;

      case CommandsGestor.VerRutas:
        myGestor.visualizarRutas();
        break;
      case CommandsGestor.Salir:
        myGestor.registrarse(); 
        break;
    }
  })
}

myGestor.registrarse();  
//promptPrincipal();