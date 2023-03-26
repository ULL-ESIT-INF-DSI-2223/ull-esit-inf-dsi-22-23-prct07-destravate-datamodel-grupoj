import * as inquirer from 'inquirer';
import { JsonUsuarioColeccion } from "../usuarios/jsonUsuarioColeccion";
import { Usuario, HistoricoRuta, Coleccion } from '../usuarios/usuario';
import { Actividad, Ruta } from '../rutas/ruta';
import { EstadisticasEntrenamiento } from './grupo';
import { promptPrincipal, CommandsEach, jsonGruposColeccion, AtributosOrdenacionOrientacion, AtributosMostrar, pantallaPrincipal} from '../index';
import { AtributosGrupo } from './grupoColeccion';

/**
 * Enumerado de los distintos Atributos
 * de ordenación de un grupo
 * @param nombre del grupo
 * @param kms del grupo
 * @param miembros del grupo
 */
export enum AtributosOrdenacionGrupo {
  Nombre = 'Alfabéticamente por nombre del grupo',
  Kms = 'Por cantidad de kms realizados conjuntamente, en función de la semana actual, mes o año',
  Miembros = 'Por cantidad de miembros que lo componen'
}

/**
 * Prompt para insertar elemento Grupo
 */
export async function insertarGrupoPrompt(opcion: number =  1, adminID: number = 0) {
  console.clear();
  let nombre : string;
  let participantes : number[];
  let estadisticasEntrenamiento : EstadisticasEntrenamiento;
  let clasificacion : Usuario[];
  let rutasFavoritas : number[];
  let historicoRutas : HistoricoRuta[] = [];
  
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "addNombre",
    message: "Introducir Nombre: ",
  },
  {
    type: "input",
    name: "addParticipantes",
    message: "Introducir los participantes (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addEstadisticasEntrenamiento",
    message: "Introducir las estadísticas de entrenamiento (km, desnivel, mes, año): ",
  },
  
  {
    type: "input",
    name: "addClasificacion",
    message: "Introducir la clasificación (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addRutasFavoritas",
    message: "Introducir rutas favoritas (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addHistoricoRutas",
    message: "Introducir el historico de rutas ([02-03-22, 3], [03-05-23, 1]): ",
  },
  ]);
  
  nombre = respuestas["addNombre"];
  participantes = respuestas["addParticipantes"].split(',').map(Number);
  estadisticasEntrenamiento = respuestas["addEstadisticasEntrenamiento"].split(', ');  
  clasificacion = respuestas["addClasificacion"]; 
  rutasFavoritas = respuestas["addRutasFavoritas"].split(',').map(Number);
  estadisticasEntrenamiento[0] = Number(estadisticasEntrenamiento[0]);
  estadisticasEntrenamiento[1] = Number(estadisticasEntrenamiento[1]);
  estadisticasEntrenamiento[3] = Number(estadisticasEntrenamiento[3]);  

  let historicoRutasStr: string[] = respuestas["addHistoricoRutas"].replaceAll('[', '').replaceAll(' ', '').replaceAll('],', '|').replaceAll(']', '').split('|');
  historicoRutasStr.forEach(historico => {
    let aux: string[] = (historico.split(','));
    historicoRutas.push([aux[0], Number(aux[1])]);
  })
  jsonGruposColeccion.addGrupo(nombre, participantes, estadisticasEntrenamiento, clasificacion, rutasFavoritas, historicoRutas, adminID);
  
  if (opcion === 1) {
    promptPrincipal("Grupo creado"); 
  } else{
    pantallaPrincipal("Grupo creado");
  }
}


/**
 * Prompt para eliminar determinado elemento Grupo
 */
async function eliminarGrupoPrompt () {
  console.clear();
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "removeID",
    message: "Introducir ID del grupo a eliminar: ",
  }
  ]);

  if (jsonGruposColeccion.removeGrupo(Number(respuestas["removeID"]))) {
    promptPrincipal("Grupo eliminado");
  }
  else {
    promptPrincipal("Grupo NO eliminado, datos incorrectos");
  }
}

/**
 * Prompt para modificar determinado elemento Grupo
 */
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
    choices: Object.values(AtributosGrupo),
  })
  let respuestaModificar = await inquirer.prompt([  
    {
      type: "input",
      name: "modifyElement",
      message: "Introducir el nuevo parametro en su formato correspondiente: ",
    }
  ]);

  if (jsonGruposColeccion.modifyGrupo(Number(respuestaID["modifyID"]), respuestaElemento["element"], respuestaModificar["modifyElement"])) {
    promptPrincipal("Grupo modificado");
  }
  else {
    promptPrincipal("Grupo NO modificado, datos incorrectos");
  }
}



/**
 * Prompt para mostrar determinado elemento Grupo
 */
export async function mostrarGrupoPrompt (opcion: number = 1) {
  console.clear();

  let respuestaOrdenacion = await inquirer.prompt({
    type: "list",
    name: "ordenacion",
    message: "¿Cómo deseas que se te muestren los datos?: ",
    choices: Object.values(AtributosOrdenacionGrupo),
  })

  let respuestaOrdenacionOrientacion = await inquirer.prompt({
    type: "list",
    name: "orientacion",
    message: "¿Orden ascendente o descendente?: ",
    choices: Object.values(AtributosOrdenacionOrientacion),
  })

  if (!jsonGruposColeccion.showGrupo(respuestaOrdenacion["ordenacion"], respuestaOrdenacionOrientacion["orientacion"])) {
    if (opcion === 0) {
      pantallaPrincipal();
    }
    else{
      promptPrincipal("NO se han podido mostrar los datos");
    }
  }
  let espera = await inquirer.prompt({
    type: "list",
    name: "volver",
    message: "",
    choices: Object.values(AtributosMostrar),
  });
  if (opcion === 0) {
    pantallaPrincipal();
  }
  else {
    promptPrincipal();
  }
}

/**
 * Prompt principal de Grupo
 */
export function promptGrupos() {
  console.clear();

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
      
      case CommandsEach.Mostrar:
        mostrarGrupoPrompt();
        break;
    }
  })
}