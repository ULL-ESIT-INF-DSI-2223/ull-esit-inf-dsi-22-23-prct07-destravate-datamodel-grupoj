import * as inquirer from 'inquirer';
import { AtributosReto} from '../internal';
import {Actividad} from '../internal';
import { promptPrincipal, CommandsEach, jsonRetosColeccion, AtributosOrdenacionOrientacion, AtributosMostrar} from '../internal';

/**
 * Enumerado de los distintos Atributos
 * de ordenación de un reto
 * @param nombre del reto
 * @param kms del reto
 * @param miembros del reto
 */
export enum AtributosOrdenacionReto {
  Nombre = 'Alfabéticamente por nombre del grupo',
  Kms = 'Por cantidad de kms realizados conjuntamente, en función de la semana actual, mes o año',
  Miembros = 'Por cantidad de miembros que lo componen'
}
/**
 * Prompt para insertar elemento Reto
 */ 
async function insertarRetoPrompt() {
  console.clear();
  let nombre: string = "";
  let rutas: number[];
  let actividad: Actividad;
  let usuarios: number[];
  
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "addNombre",
    message: "Introducir Nombre: ",
  },
  {
    type: "input",
    name: "addRutas",
    message: "Introducir los IDs de las rutas que forman parte del reto (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addActividad",
    message: "Introducir la actividad (Correr o Bicicleta): ",
  },
  {
    type: "input",
    name: "addUsuarios",
    message: "Introducir los IDs de los usuarios que realizan el reto (1, 2, 3): ",
  }
  ]);
  
  nombre = respuestas["addNombre"];
  rutas = respuestas["addRutas"].split(',').map(Number);
  actividad = respuestas["addActividad"];
  usuarios = respuestas["addUsuarios"].split(',').map(Number);
 

  if (actividad == "Bicicleta" || actividad == "Correr") {
    jsonRetosColeccion.addReto(nombre, rutas, actividad, usuarios);
    promptPrincipal("Reto creado"); 
  }
  else {
    promptPrincipal("Reto NO creado, datos incorrectos");
  }
}

/**
 * Prompt para eliminar determinado elemento Reto
 */
async function eliminarRetoPrompt () {
  console.clear();
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "removeID",
    message: "Introducir ID del reto a eliminar: ",
  }
  ]);

  if (jsonRetosColeccion.removeReto(Number(respuestas["removeID"]))) {
    promptPrincipal("Reto eliminado");
  }
  else {
    promptPrincipal("Reto NO eliminado, datos incorrectos");
  }
}

/**
 * Prompt para modificar determinado elemento Reto
 */
async function modificarRetoPrompt() {
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
    choices: Object.values(AtributosReto),
  })
  let respuestaModificar = await inquirer.prompt([  
    {
      type: "input",
      name: "modifyElement",
      message: "Introducir el nuevo parametro en su formato correspondiente: ",
    }
  ]);

  if (jsonRetosColeccion.modifyReto(Number(respuestaID["modifyID"]), respuestaElemento["element"], respuestaModificar["modifyElement"])) {
    promptPrincipal("Reto modificado");
  }
  else {
    promptPrincipal("Reto NO modificado, datos incorrectos");
  }
}

/**
 * Prompt para mostrar determinado elemento Grupo
 */
async function mostrarRetoPrompt () {
  console.clear();

  let respuestaOrdenacion = await inquirer.prompt({
    type: "list",
    name: "ordenacion",
    message: "¿Cómo deseas que se te muestren los datos?: ",
    choices: Object.values(AtributosOrdenacionReto),
  })

  let respuestaOrdenacionOrientacion = await inquirer.prompt({
    type: "list",
    name: "orientacion",
    message: "¿Orden ascendente o descendente?: ",
    choices: Object.values(AtributosOrdenacionOrientacion),
  })

  if (!jsonRetosColeccion.showReto(respuestaOrdenacion["ordenacion"], respuestaOrdenacionOrientacion["orientacion"])) {
    promptPrincipal("NO se han podido mostrar los datos");
  }
  let espera = await inquirer.prompt({
    type: "list",
    name: "volver",
    message: "",
    choices: Object.values(AtributosMostrar),
  });
  promptPrincipal();
}


/**
 * Prompt principal de Retos
 */
export function promptRetos() {
  console.clear();

  inquirer.prompt({
    type: "list",
    name: "command",
    message: "¿Qué quieres hacer?: ",
    choices: Object.values(CommandsEach),
  }).then(answers => {
    switch (answers["command"]) {
      case CommandsEach.Insertar:
        insertarRetoPrompt();
        break;

      case CommandsEach.Modificar:
        modificarRetoPrompt();
        break;
      
      case CommandsEach.Eliminar:
        eliminarRetoPrompt();
        break;
      
      case CommandsEach.Mostrar:
          mostrarRetoPrompt();
          break;

      case CommandsEach.Atras:
        promptPrincipal();
        break;
    }
  })
}