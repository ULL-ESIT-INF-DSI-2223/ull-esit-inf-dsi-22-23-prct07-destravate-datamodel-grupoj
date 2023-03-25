import * as inquirer from 'inquirer';
import { UsuarioColeccion, AtributosUsuario } from "../usuarios/usuarioColeccion";
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

/*async function eliminarUsuarioPrompt () {
  console.clear();
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "removeID",
    message: "Introducir ID del usuario a eliminar: ",
  }
  ]);

  if (jsonUsuariosColeccion.removeUsuario(Number(respuestas["removeID"]))) {
    promptPrincipal("Usuario eliminado");
  }
  else {
    promptPrincipal("Usuario NO eliminado, datos incorrectos");
  }
}*/

/*async function modificarUsuarioPrompt () {
  console.clear();
  let respuestaID = await inquirer.prompt([  
  {
    type: "input",
    name: "modifyID",
    message: "Introducir ID del usuario a modificar: ",
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

  if (jsonUsuariosColeccion.modifyUsuario(Number(respuestaID["modifyID"]), respuestaElemento["element"], respuestaModificar["modifyElement"])) {
    promptPrincipal("Usuario modificado");
  }
  else {
    promptPrincipal("Usuario NO modificado, datos incorrectos");
  }
}*/

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
        //modificarUsuarioPrompt();
        break;
      
      case CommandsEach.Eliminar:
        //eliminarUsuarioPrompt();
        break;

      case CommandsEach.Atras:
        promptPrincipal();
        break;
    }
  })
}