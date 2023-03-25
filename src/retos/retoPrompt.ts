import * as inquirer from 'inquirer';
import { AtributosReto } from "./retoColeccion";
import { JsonRetoColeccion } from "./jsonRetoColeccion";
import { Usuario, HistoricoRuta, Coleccion } from '../usuarios/usuario';
import { Actividad, Ruta } from '../rutas/ruta';
import { EstadisticasEntrenamiento } from '../grupos/grupo';
import { promptPrincipal, CommandsEach, jsonRetosColeccion } from '../index';

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

export function promptRetos() {
  console.clear();
  //jsonUsuariosColeccion.mostrarUsuarios()  

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

      case CommandsEach.Atras:
        promptPrincipal();
        break;
    }
  })
}