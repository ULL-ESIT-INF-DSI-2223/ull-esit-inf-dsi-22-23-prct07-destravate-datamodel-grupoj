import * as inquirer from 'inquirer';
import { UsuarioColeccion } from "./usuarioColeccion";
import { JsonUsuarioColeccion } from "./jsonUsuarioColeccion";
import { Usuario, HistoricoRuta, Coleccion } from './usuario';
import { Actividad, Ruta } from './ruta';
import { EstadisticasEntrenamiento } from './grupo';

let usuario1 = new Usuario(1, 'Andrés', 'Correr', [2, 3], [[1]], [1, 2, 'abril', 2], [1, 2], [1, 2], [['hola', 2]]);
let usuario2 : Usuario = new Usuario(2, 'Laura', 'Bicicleta', [6, 7], [[2]], [1, 2, 'abril', 2], [1, 2], [1, 2], [['perrear', 10]]);
let usuario3 : Usuario = new Usuario(3, 'Laura', 'Bicicleta', [6, 7], [[2]], [1, 2, 'abril', 2], [1, 2], [1, 2], [['perrear', 10]]);
let usuario4 : Usuario = new Usuario(4, 'Laura', 'Bicicleta', [6, 7], [[2]], [1, 2, 'abril', 2], [1, 2], [1, 2], [['perrear', 10]]);
let jsonUsuariosColeccion = new JsonUsuarioColeccion([]);

enum Commands {
  Usuarios = "Usuarios",
  Grupos = "Grupos",
  Rutas = "Rutas", 
  Retos = "Retos",
  Salir = "Salir"
}

async function insertarUsuarioPrompt () {
  console.clear();
  let nombre: string = "";
  let actividades: Actividad;
  let amigosapp: number[];
  let grupoAmigos: Coleccion;
  let entrenamiento: EstadisticasEntrenamiento;
  let rutasFavoritas: number[];
  let retosActivos: number[];
  let historicoRutas: HistoricoRuta[];
  
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
  /*{
    type: "input",
    name: "addGrupoAmigos",
    message: "Introducir el grupo de amigos ([1], [2, 3]): ",
  },*/
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
  /*{
    type: "input",
    name: "addHistoricoRutas",
    message: "Introducir el histórico de las rutas (1/02/2023, 2): ",
  }*/
  ]);
  
  nombre = respuestas["addNombre"];
  actividades = respuestas["addActividades"];
  amigosapp = respuestas["addAmigosApp"].split(',').map(Number);
  //grupoAmigos = respuestas["addGrupoAmigos"].split(']');  // [1], [2, 3]
  entrenamiento = respuestas["addEntrenamiento"].split(', ');
  entrenamiento[0] = Number(entrenamiento[0]);
  entrenamiento[1] = Number(entrenamiento[1]);
  entrenamiento[3] = Number(entrenamiento[3]);
  rutasFavoritas = respuestas["addRutasFavoritas"].split(',').map(Number);
  retosActivos = respuestas["addRetosActivos"].split(',').map(Number);
  //historicoRutas = respuestas["addHistoricoRutas"].split(', ');

  if (actividades == "Bicicleta" || actividades == "Correr") {
    jsonUsuariosColeccion.addUsuario(nombre, actividades, amigosapp, [[0]], entrenamiento, rutasFavoritas, retosActivos, [['', 0]]);
  }
  else {
    console.log("Usuario NO creado, datos incorrectos");
  }
  promptUsuarios();
}
 
function promptUsuarios() {
  console.clear();
  jsonUsuariosColeccion.mostrarUsuarios()  

  inquirer.prompt({
    type: "list",
    name: "command",
    message: "¿Qué quieres mostrar?: ",
    choices: Object.values(Commands),
  }).then(answers => {
    switch (answers["command"]) {
      case Commands.Usuarios:
        insertarUsuarioPrompt();
        break;
      
      default:
        break;
    }
  })
}

promptUsuarios();


/*
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
  estadisticasEntrenamiento = respuestas["addEstadisticasEntrenamiento"];  
  clasificacion = respuestas["addClasificacion"]; 
  rutasFavoritas = respuestas["addRutasFavoritas"]; 
  historicoRutas = respuestas["addHistoricoRutas"]; 

  jsonGruposColeccion.addGrupo(nombre, actividades, amigosapp, [[0]], [0, 0, '', 0], [0], [0], [['', 0]])
  promptUsuarios();
}*/