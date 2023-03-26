import * as inquirer from 'inquirer';
import { AtributosRuta, JsonRutaColeccion } from "../internal";
import { Usuario, HistoricoRuta, Coleccion } from '../internal';
import { Actividad, Ruta, Coordenada } from '../internal';
import { EstadisticasEntrenamiento } from '../internal';
import { promptPrincipal, CommandsEach, jsonRutasColeccion, AtributosMostrar, AtributosOrdenacionOrientacion, pantallaPrincipal } from '../internal';

/**
 * Enumerado de los distintos Atributos
 * de ordenación de un grupo
 * @param nombre del grupo
 * @param kms del grupo
 * @param miembros del grupo
 */
export enum AtributosOrdenacionRuta {
  Nombre = 'Alfabéticamente por nombre del grupo.',
  Usuarios = 'Por cantidad de usuarios que realizan las rutas, ascendente y descendente.',
  Longitud = 'Por longitud de la ruta, ascendente y descendente.',
  Calificacion = 'Por la calificación media de la ruta, ascendente y descendente.',
  Actividad = 'Por actividad: correr o ciclismo.'
}

/**
 * Prompt para insertar elemento Ruta
 */
async function insertarRutaPrompt() {
  console.clear();
  let nombre: string = "";
  let geolocalizacionInicio: Coordenada;
  let geolocalizacionFinal: Coordenada;
  let longitud: number;
  let desnivelMedio: number;
  let usuariosRealizaron: number[];
  let tipoActividad: Actividad;
  let calificacionMedia: number;
  
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "addNombre",
    message: "Introducir Nombre: ",
  },
  {
    type: "input",
    name: "addCoordenadaInicio",
    message: "Introducir Coordenada del Inicio (12, 15, 22, N): ",
  },
  {
    type: "input",
    name: "addCoordenadaFinal",
    message: "Introducir Coordenada del Final (12, 15, 22, N): ",
  },
  {
    type: "input",
    name: "addLongitud",
    message: "Introducir Longitud de la ruta Km (12): ",
  },
  {
    type: "input",
    name: "addDesnivel",
    message: "Introducir Desnivel medio de la ruta (12): ",
  },
  {
    type: "input",
    name: "addUsuarios",
    message: "Introducir los IDs de los usuarios que han realizado la ruta (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addActividad",
    message: "Introducir la actividad (Correr o Bicicleta): ",
  },
  {
    type: "input",
    name: "addCalificacion",
    message: "Introducir Calificación media de la ruta (8): ",
  }
  ]);
  
  nombre = respuestas["addNombre"];
  geolocalizacionInicio = respuestas["addCoordenadaInicio"].split(', ');
  geolocalizacionInicio[0] = Number(geolocalizacionInicio[0]);
  geolocalizacionInicio[1] = Number(geolocalizacionInicio[1]);
  geolocalizacionInicio[2] = Number(geolocalizacionInicio[2]);
  geolocalizacionFinal = respuestas["addCoordenadaFinal"].split(', ');
  geolocalizacionFinal[0] = Number(geolocalizacionFinal[0]);
  geolocalizacionFinal[1] = Number(geolocalizacionFinal[1]);
  geolocalizacionFinal[2] = Number(geolocalizacionFinal[2]);
  longitud = Number(respuestas["addLongitud"]);
  desnivelMedio = Number(respuestas["addDesnivel"]);
  usuariosRealizaron = respuestas["addUsuarios"].split(',').map(Number);
  tipoActividad = respuestas["addActividad"];
  calificacionMedia = Number(respuestas["addCalificacion"]);
 

  if (tipoActividad == "Bicicleta" || tipoActividad == "Correr") {
    jsonRutasColeccion.addRuta(nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia);
    promptPrincipal("Ruta creada"); 
  }
  else {
    promptPrincipal("Ruta NO creada, datos incorrectos");
  }
}

/**
 * Prompt para eliminar determinado elemento Ruta
 */
async function eliminarRutaPrompt () {
  console.clear();
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "removeID",
    message: "Introducir ID de la ruta a eliminar: ",
  }
  ]);

  if (jsonRutasColeccion.removeRuta(Number(respuestas["removeID"]))) {
    promptPrincipal("Ruta eliminada");
  }
  else {
    promptPrincipal("Ruta NO eliminada, datos incorrectos");
  }
}

/**
 * Prompt para modificar determinado elemento Ruta
 */
async function modificarRutaPrompt() {
  console.clear();
  let respuestaID = await inquirer.prompt([  
  {
    type: "input",
    name: "modifyID",
    message: "Introducir ID del reto a modificar: ",
  }
  ]);
  let respuestaElemento = await inquirer.prompt({
    type: "list",
    name: "element",
    message: "¿Qué atributo quieres modificar?: ",
    choices: Object.values(AtributosRuta),
  })
  let respuestaModificar = await inquirer.prompt([  
    {
      type: "input",
      name: "modifyElement",
      message: "Introducir el nuevo parametro en su formato correspondiente: ",
    }
  ]);

  if (jsonRutasColeccion.modifyRuta(Number(respuestaID["modifyID"]), respuestaElemento["element"], respuestaModificar["modifyElement"])) {
    promptPrincipal("Ruta modificado");
  }
  else {
    promptPrincipal("Ruta NO modificado, datos incorrectos");
  }
}


/**
 * Prompt para mostrar determinado elemento Usuario
 */
export async function mostrarRutaPrompt(opcion: number = 1) {
  console.clear();

  let respuestaOrdenacion = await inquirer.prompt({
    type: "list",
    name: "ordenacion",
    message: "¿Cómo deseas que se te muestren los datos?: ",
    choices: Object.values(AtributosOrdenacionRuta),
  })

  let respuestaOrdenacionOrientacion = await inquirer.prompt({
    type: "list",
    name: "orientacion",
    message: "¿Orden ascendente o descendente?: ",
    choices: Object.values(AtributosOrdenacionOrientacion),
  })

  if (!jsonRutasColeccion.showRuta(respuestaOrdenacion["ordenacion"], respuestaOrdenacionOrientacion["orientacion"])) {
    if (opcion === 0) {
      pantallaPrincipal();
    }
    else {
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
 * Prompt principal de Rutas
 */
export function promptRutas() {
  console.clear();

  inquirer.prompt({
    type: "list",
    name: "command",
    message: "¿Qué quieres hacer?: ",
    choices: Object.values(CommandsEach),
  }).then(answers => {
    switch (answers["command"]) {
      case CommandsEach.Mostrar:
        mostrarRutaPrompt();
        break;

      case CommandsEach.Insertar:
        insertarRutaPrompt();
        break;

      case CommandsEach.Modificar:
        modificarRutaPrompt();
        break;
      
      case CommandsEach.Eliminar:
        eliminarRutaPrompt();
        break;

      case CommandsEach.Atras:
        promptPrincipal();
        break;
    }
  })
}