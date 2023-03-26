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
import { Gestor } from './gestor'

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

//myGestor.registrarse();  
promptPrincipal();