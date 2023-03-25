import * as inquirer from 'inquirer';
import { UsuarioColeccion, AtributosUsuario } from "./usuarioColeccion";
import { JsonUsuarioColeccion } from "./jsonUsuarioColeccion";
import { Usuario, HistoricoRuta, Coleccion } from './usuario';
import { Actividad, Ruta } from '../rutas/ruta';
import { EstadisticasEntrenamiento } from '../grupos/grupo';
import { promptPrincipal, CommandsEach } from '../index';

let jsonUsuariosColeccion = new JsonUsuarioColeccion([]);

async function insertarUsuarioPrompt () {
  console.clear();
  let nombre: string = "";
  let actividades: Actividad;
  let amigosapp: number[];
  let grupoAmigos: Coleccion = [];
  let entrenamiento: EstadisticasEntrenamiento;
  let rutasFavoritas: number[];
  let retosActivos: number[];
  let historicoRutas: HistoricoRuta[] = [];
  
  let respuestas = await inquirer.prompt([  
  {
    type: "input",
    name: "addNombre",
    message: "Introducir Nombre: ",
  },
  {
    type: "input",
    name: "addActividades",
    message: "Introducir la actividad (Correr o Bicicleta): ",
  },
  {
    type: "input",
    name: "addAmigosApp",
    message: "Introducir los amigos de la aplicación (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addGrupoAmigos",
    message: "Introducir el grupo de amigos ([1], [2, 3]): ",
  },
  {
    type: "input",
    name: "addEntrenamiento",
    message: "Introducir el entrenamiento (km, desnivel, mes, año): ",
  },
  {
    type: "input",
    name: "addRutasFavoritas",
    message: "Introducir las rutas favoritas (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addRetosActivos",
    message: "Introducir los retos activos (1, 2, 3): ",
  },
  {
    type: "input",
    name: "addHistoricoRutas",
    message: "Introducir el histórico de las rutas ([02-03-22, 3], [03-05-23, 1]): ",
  }
  ]);
  
  nombre = respuestas["addNombre"];
  actividades = respuestas["addActividades"];
  amigosapp = respuestas["addAmigosApp"].split(',').map(Number);
  let grupoAmigosStr: string[] = respuestas["addGrupoAmigos"].replaceAll('[', '').replaceAll(' ', '').replaceAll('],', '|').replaceAll(']', '').split('|');
  grupoAmigosStr.forEach(grupo => {
    grupoAmigos.push(grupo.split(',').map(Number));
  })
  entrenamiento = respuestas["addEntrenamiento"].split(', ');
  entrenamiento[0] = Number(entrenamiento[0]);
  entrenamiento[1] = Number(entrenamiento[1]);
  entrenamiento[3] = Number(entrenamiento[3]);
  rutasFavoritas = respuestas["addRutasFavoritas"].split(',').map(Number);
  retosActivos = respuestas["addRetosActivos"].split(',').map(Number);
  let historicoRutasStr: string[] = respuestas["addHistoricoRutas"].replaceAll('[', '').replaceAll(' ', '').replaceAll('],', '|').replaceAll(']', '').split('|');
  historicoRutasStr.forEach(historico => {
    let aux: string[] = (historico.split(','));
    historicoRutas.push([aux[0], Number(aux[1])]);
  })

  if (actividades == "Bicicleta" || actividades == "Correr") {
    jsonUsuariosColeccion.addUsuario(nombre, actividades, amigosapp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas);
    promptPrincipal("Usuario creado"); 
  }
  else {
    promptPrincipal("Usuario NO creado, datos incorrectos");
  }
}

async function eliminarUsuarioPrompt () {
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
}

async function modificarUsuarioPrompt () {
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
}

export function promptUsuarios() {
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
        insertarUsuarioPrompt();
        break;

      case CommandsEach.Modificar:
        modificarUsuarioPrompt();
        break;
      
      case CommandsEach.Eliminar:
        eliminarUsuarioPrompt();
        break;

      case CommandsEach.Atras:
        promptPrincipal();
        break;
    }
  })
}