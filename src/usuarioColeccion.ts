import { Usuario, HistoricoRuta, Coleccion } from "./usuario";
import { EstadisticasEntrenamiento } from "./grupo";
import { Actividad } from "./ruta";

export enum AtributosUsuario {
  Nombre = 'Nombre',
  Actividad = 'Actividad (Correr o Bicicleta)',
  AmigosApp = 'Amigos APP (1, 2, 3)',
  GrupoAmigos = 'Grupo de Amigos ([1], [2, 3])',
  Entrenamiento = 'Entrenamiento (km, desnivel, mes, año)',
  RutasFavoritas = 'Rutas Favoritas (1, 2, 3)',
  RetosActivos = 'Retos Activos (1, 2, 3)',
  HistoricoRutas = 'Historico de Rutas ([02-03-22, 3], [03-05-23, 1])'
}

/**
 * Clase UsuarioColeccion que alberga
 * @param _usuarios Colección de usuarios
 * @param _ultID 
 */
export class UsuarioColeccion {
  protected _usuarios: Usuario[];
  protected _ultID: number;
  /**
   * Constructor de la clase UsuarioColeccion
   * @param usuarios Colección de usuarios
   */
  constructor(usuarios: Usuario[]) {
    this._usuarios = usuarios;
    if (usuarios.length != 0) {
      this._ultID = usuarios[usuarios.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }

  mostrarUsuarios () : void { 
    //this._usuarios.sort((a, b) => a.ID - b.ID);    
    this._usuarios.forEach(usuario => {
      usuario.mostrarUsuario();
      console.log('\n');
    });
  }

  insertarUsuario(nombre: string, actividades: Actividad, amigosApp: number[], grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, 
                  rutasFavoritas: number[], retosActivos: number[], historicoRutas: HistoricoRuta[]) {

    this._usuarios.push(new Usuario(++this._ultID, nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas));
  }

  borrarUsuario (ID: number) : boolean {
    let flag: boolean = false;
    this._usuarios.forEach((usuario, index) => {
      if (usuario.ID == ID) {
        this._usuarios.splice(index, 1);
        flag = true;
      }
    })

    return flag;
  }

  modificarUsuario (ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
    let flag: boolean = false;
    this._usuarios.forEach((usuario, index) => {
      if (usuario.ID == ID) {
        switch (atributoModificar) {
          case AtributosUsuario.Nombre:
            this._usuarios[index].nombre = nuevoAtributo;
            break;

          case AtributosUsuario.Actividad:
            if (nuevoAtributo == 'Correr') {
              this._usuarios[index].actividades = 'Correr';
            }
            else if (nuevoAtributo == 'Bicicleta') {
              this._usuarios[index].actividades = 'Bicicleta';
            }       
            break;

          case AtributosUsuario.AmigosApp:
            this._usuarios[index].amigosApp = nuevoAtributo.split(',').map(Number);
            break;
          
          case AtributosUsuario.GrupoAmigos:
            let grupoAmigosAux: Coleccion = [];
            let grupoAmigosStr: string[] = nuevoAtributo.replaceAll('[', '').replaceAll(' ', '').replaceAll('],', '|').replaceAll(']', '').split('|');
            grupoAmigosStr.forEach(grupo => {
              grupoAmigosAux.push(grupo.split(',').map(Number));
            })
            this._usuarios[index].grupoAmigos = grupoAmigosAux;
            break;
          
          case AtributosUsuario.Entrenamiento:
            let entrenamientoAux: EstadisticasEntrenamiento;
            let entrenamientoStr: string[] = nuevoAtributo.split(', ');
            this._usuarios[index].entrenamiento[0] = Number(entrenamientoStr[0]);
            this._usuarios[index].entrenamiento[1] = Number(entrenamientoStr[1]);
            this._usuarios[index].entrenamiento[2] = entrenamientoStr[2];
            this._usuarios[index].entrenamiento[3] = Number(entrenamientoStr[3]);
            break;

          case AtributosUsuario.RutasFavoritas:
            this._usuarios[index].rutasFavoritas = nuevoAtributo.split(',').map(Number);
            break;

          case AtributosUsuario.RetosActivos:
            this._usuarios[index].retosActivos = nuevoAtributo.split(',').map(Number);
            break;

          case AtributosUsuario.HistoricoRutas:
            let historicoRutasStr: string[] = nuevoAtributo.replaceAll('[', '').replaceAll(' ', '').replaceAll('],', '|').replaceAll(']', '').split('|');
            let historicoRutasAux: HistoricoRuta[] = [];
            historicoRutasStr.forEach(historico => {
              let aux: string[] = (historico.split(','));
              historicoRutasAux.push([aux[0], Number(aux[1])]);
            })
            this._usuarios[index].historicoRutas = historicoRutasAux;
            break;
  
        }
        flag = true;
      }
    })

    return flag;
  }
}