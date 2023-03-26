import { Usuario, HistoricoRuta, Coleccion } from "../internal";
import { EstadisticasEntrenamiento, Actividad } from "../internal";
import { AtributosOrdenacionUsuario, AtributosOrdenacionOrientacion } from "../internal";

/**
 * Enumerado de los distintos Atributos de un usuario
 * @param nombre del usuario
 * @param actividad del usuario
 * @param amigosApp del usuario
 * @param grupoAmigos del usuario
 * @param entrenamiento del usuario
 * @param rutasFavoritas del usuario
 * @param retosActivos del usuario
 * @param historicoRutas del usuario
 */
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

  /** Getter del atributo ultID
   * @returns El ultimo Id para registrar
   */
  get ultID() : number {
    return this._ultID;
  }

  /**
   * Método para insertar un usuario a la colección
   * @param nombre Nombre propio de usuario
   * @param actividades Tipo de actividad: correr o bicicleta
   * @param amigosApp Colleción de IDs de usuarios con los que se interacciona
   * @param grupoAmigos  Diferentes colecciones de IDs de usuarios con los que suele realizar rutas
   * @param entrenamiento Cantidad de km y desnivel total acumulados en la semana, mes y año
   * @param rutasFavoritas Colección de IDs de las rutas que el usuario ha realizado con mayor frecuencia
   * @param retosActivos Colección de IDs de los retos que el usuario está realizando actualmente
   * @param historicoRutas Colección del historial de rutas realizadas 
   */
  insertarUsuario(nombre: string, actividades: Actividad, amigosApp: number[], grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, 
                  rutasFavoritas: number[], retosActivos: number[], historicoRutas: HistoricoRuta[]) {

    this._usuarios.push(new Usuario(++this._ultID, nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas));
  }

  /**
   * Método para eliminar un usuario de la colección
   * @param ID ID unico de cada usuario
   * @returns un valor logico si se pudo elimnar el usuario o no
   */
  borrarUsuario(ID: number) : boolean {
    let flag: boolean = false;
    this._usuarios.forEach((usuario, index) => {
      if (usuario.ID == ID) {
        this._usuarios.splice(index, 1);
        flag = true;
      }
    })

    return flag;
  }

  /**
   * Método para modificar un atributo de un usuario de la colección
   * @param ID ID único del usuario
   * @param atributoModificar Atributo a modificar
   * @param nuevoAtributo Valor del nuevo atributo
   * @returns un valor logico si se pudo modificar el atributo o no
   */
  modificarUsuario(ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
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

  /**
   * Método para retornar los Usuarios correspondientes a una colección de IDs
   * @param usuariosIds Ids de los usuarios a buscar
   * @returns un array de Usuarios que coinciden con los IDs introducidos
   */
  buscarUsuarios(usuariosIds: number[]) : Usuario[] {
    let usuarios: Usuario[] = [];

    this._usuarios.forEach(usuario => {
      usuariosIds.forEach(usuarioId => {
        if(usuario.ID ==  usuarioId) {
          usuarios.push(usuario);
        }
      })
    })

    return usuarios;
  }

  /**
   * Obtener la posición en el array _usuarios
   * donde se encuentra el usuario según su ID
   * @param ID_usuario ID del usuario
   */
  devolverIndexUsuario(ID_usuario: number) : number {
    let usuarioIndex: number = -1;

    this._usuarios.forEach((usuario, index) => {
      if(usuario.ID ==  ID_usuario) {
        usuarioIndex = index;
      }
    })

    return usuarioIndex;
  }

  /**
   * Método para añadir un amigo a un usuario
   * @param ID_usuario ID del usuario a añadir un amigo
   * @param ID_amigo ID del amigo a insertar
   */
  anadirAmigo (ID_usuario : number, ID_amigo : number) {
    this._usuarios[this.devolverIndexUsuario(ID_usuario)].incluirAmigo(ID_amigo);
  } 

  /**
   * Método para eliminar un amigo a un usuario
   * @param ID_usuario ID del usuario a eliminar un amigo
   * @param ID_amigo ID del amigo a eliminar
   */
  borrarAmigo(ID_usuario : number, ID_amigo : number) {
    this._usuarios[this.devolverIndexUsuario(ID_usuario)].quitarAmigo(ID_amigo);
  } 

  /**
  * Método para mostrar una serie de atributos de un grupo de la colección
  * @param ordenacion opción de ordenación
  * @param orientacion opción de orientación
  * @returns un valor logico si se pudo mostrar correctamente la información por pantalla
  */
  mostrarUsuarios(ordenacion: string, orientacion : string) : boolean {
    switch (ordenacion) {
      case AtributosOrdenacionUsuario.Nombre:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._usuarios.sort((a, b) => {
            return b.nombre.localeCompare(a.nombre);
          });
          break;
            
          case AtributosOrdenacionOrientacion.Descendente:
            this._usuarios.sort((a, b) => {
            return a.nombre.localeCompare(b.nombre);
          });
          break;
        }
      break;
      
      case AtributosOrdenacionUsuario.Kms:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._usuarios.sort((a, b) => b.entrenamiento[0] - a.entrenamiento[0]); // Orden ascendente
            break;
          
          case AtributosOrdenacionOrientacion.Descendente:
            this._usuarios.sort((a, b) => a.entrenamiento[0] - b.entrenamiento[0]); // Orden descendente
            break;
        }
        break;

    }

    this._usuarios.forEach(usuario => {
      usuario.mostrarUsuario();
      console.log('\n');
    });
    
    this._usuarios.sort((a, b) => a.ID - b.ID); // Orden descendente

    return true;
  }


  existeUsuario(id: number): boolean {
    let result: boolean = false;
    this._usuarios.forEach(usuario => {
      if(usuario.ID === id) {
        result = true;
      }
    });
    return result;
  }
} 