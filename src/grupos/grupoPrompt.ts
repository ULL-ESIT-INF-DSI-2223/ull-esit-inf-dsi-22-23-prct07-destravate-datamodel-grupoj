import * as inquirer from 'inquirer';
import { UsuarioColeccion, AtributosUsuario } from "../usuarios/usuarioColeccion";
import { JsonUsuarioColeccion } from "../usuarios/jsonUsuarioColeccion";
import { Usuario, HistoricoRuta, Coleccion } from '../usuarios/usuario';
import { Actividad, Ruta } from '../rutas/ruta';
import { EstadisticasEntrenamiento } from './grupo';
import { promptPrincipal, CommandsEach } from '../index';

async function insertarGrupoPrompt () {
  console.clear();
  let ID : number;
  let nombre : string;
  let participantes : number[];
  let estadisticasEntrenamiento : EstadisticasEntrenamiento;
  let clasificacion : Usuario[];
  let rutasFavoritas : Ruta[];
  let historicoRutas : Ruta[];
  
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "addID",
    message: "Introducir ID: ",
  },
  {
    type: "input",
    name: "addNombre",
    message: "Introducir Nombre: ",
  },
  {
    type: "input",
    name: "addParticipantes",
    message: "Introducir los participantes: ",
  },
  {
    type: "input",
    name: "addEstadisticasEntrenamiento",
    message: "Introducir las estadísticas de entrenamiento: ",
  },
  
  {
    type: "input",
    name: "addClasificacion",
    message: "Introducir la clasificación: ",
  },
  {
    type: "input",
    name: "addRutasFavoritas",
    message: "Introducir rutas favoritas: ",
  },
  {
    type: "input",
    name: "addHistoricoRutas",
    message: "Introducir el historico de rutas: ",
  },
  ]);
  
  ID = respuestas["addID"];
  nombre = respuestas["addNombre"];
  participantes = respuestas["addParticipantes"].split(',').map(Number);
  estadisticasEntrenamiento = respuestas["addEstadisticasEntrenamiento"].split(', ');  
  clasificacion = respuestas["addClasificacion"]; 
  rutasFavoritas = respuestas["addRutasFavoritas"].split(',').map(Number);
  historicoRutas = respuestas["addHistoricoRutas"].replaceAll('[', '').replaceAll(' ', '').replaceAll('],', '|').replaceAll(']', '').split('|');
  estadisticasEntrenamiento[0] = Number(estadisticasEntrenamiento[0]);
  estadisticasEntrenamiento[1] = Number(estadisticasEntrenamiento[1]);
  estadisticasEntrenamiento[3] = Number(estadisticasEntrenamiento[3]);  

  //jsonGruposColeccion.addGrupo(nombre, participantes, estadisticasEntrenamiento, clasificacion, rutasFavoritas, historicoRutas);
  promptGrupos();
}



async function eliminarGrupoPrompt () {
  console.clear();
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "removeID",
    message: "Introducir ID del grupo a eliminar: ",
  }
  ]);

  /*if (jsonUsuariosColeccion.removeGrupo(Number(respuestas["removeID"]))) {
    promptPrincipal("Grupo eliminado");
  }
  else {
    promptPrincipal("Grupo NO eliminado, datos incorrectos");
  }*/
}

async function modificarGrupoPrompt () {
  console.clear();
  let respuestaID = await inquirer.prompt([  
  {
    type: "input",
    name: "modifyID",
    message: "Introducir ID del grupo a modificar: ",
  }
  ]);
  let respuestaElemento = await inquirer.prompt({
    type: "list",
    name: "element",
    message: "¿Qué atributo quieres modificar?: ",
    choices: Object.values(AtributosUsuario),
  })
  let respuestaModificar = await inquirer.prompt([  
    {
      type: "input",
      name: "modifyElement",
      message: "Introducir el nuevo parametro en su formato correspondiente: ",
    }
  ]);

  /*if (jsonGrupoColeccion.modifyUsuario(Number(respuestaID["modifyID"]), respuestaElemento["element"], respuestaModificar["modifyElement"])) {
    promptPrincipal("Grupo modificado");
  }
  else {
    promptPrincipal("Grupo NO modificado, datos incorrectos");
  }*/
}

export function promptGrupos() {
  console.clear();
  //jsonGrupoColeccion.mostrarUsuarios()  

  inquirer.prompt({
    type: "list",
    name: "command",
    message: "¿Qué quieres hacer?: ",
    choices: Object.values(CommandsEach),
  }).then(answers => {
    switch (answers["command"]) {
      case CommandsEach.Insertar:
        insertarGrupoPrompt();
        break;

      case CommandsEach.Modificar:
        modificarGrupoPrompt();
        break;
      
      case CommandsEach.Eliminar:
        eliminarGrupoPrompt();
        break;

      case CommandsEach.Atras:
        promptPrincipal();
        break;
    }
  })
}