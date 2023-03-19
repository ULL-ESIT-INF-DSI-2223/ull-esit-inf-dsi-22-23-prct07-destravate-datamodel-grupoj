import * as inquirer from 'inquirer';
import { UsuarioColeccion } from "./usuarioColeccion";
import { JsonUsuarioColeccion } from "./jsonUsuarioColeccion";
import { Usuario, HistoricoRuta, Coleccion } from './usuario';
import { Actividad } from './ruta';
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
  let id: number = 0;
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
    name: "addActividades",
    message: "Introducir la actividad: ",
  },
  {
    type: "input",
    name: "addAmigosApp",
    message: "Introducir los amigos de la aplicación: ",
  },
  /*{
    type: "input",
    name: "addGrupoAmigos",
    message: "Introducir el grupo de amigos: ",
  },
  {
    type: "input",
    name: "addEntrenamiento",
    message: "Introducir el entrenamiento: ",
  },
  {
    type: "input",
    name: "addRutasFavoritas",
    message: "Introducir las rutas favoritas: ",
  },
  {
    type: "input",
    name: "addRetosActivos",
    message: "Introducir los retos activos: ",
  },
  {
    type: "input",
    name: "addHistoricoRutas",
    message: "Introducir el histórico de las rutas: ",
  },*/
  ]);
  
  id = Number(respuestas["addID"]);
  nombre = respuestas["addNombre"];
  actividades = respuestas["addActividades"];
  amigosapp = respuestas["addAmigosApp"].split(',').map(Number);
  grupoAmigos = respuestas["addGrupoAmigos"];  
  /*entrenamiento = respuestas["addEntrenamiento"];
  rutasFavoritas = respuestas["addRutasFavoritas"].map(Number);
  retosActivos = respuestas["addRetosActivos"].map(Number);
  historicoRutas = respuestas["addHistoricoRutas"];*/

  jsonUsuariosColeccion.addUsuario(id, nombre, actividades, amigosapp, [[0]], [0, 0, '', 0], [0], [0], [['', 0]])
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