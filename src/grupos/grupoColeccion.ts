import { Actividad, Ruta } from "../rutas/ruta";
import { Usuario, Coleccion, HistoricoRuta} from "../usuarios/usuario";
import { Grupo, EstadisticasEntrenamiento } from "./grupo";
import { AtributosOrdenacionGrupo } from "./grupoPrompt";
import { AtributosOrdenacionOrientacion } from "..";

/**
 * Enumerado de los distintos Atributos de un grupo
 * @param nombre del grupo
 * @param participantes del grupo
 * @param entrentamiento del grupo
 * @param clasificacion del grupo
 * @param rutasFavoritas del grupo
 * @param historicoRutas del grupo
 */
export enum AtributosGrupo {
  Nombre = 'Nombre',
  Participantes = 'Participantes (1, 2, 3)',
  Entrenamiento = 'Entrenamiento (km, desnivel, mes, año)',
  Clasificacion = 'Clasificación (1, 2, 3)',
  RutasFavoritas = 'Rutas Favoritas (1, 2, 3)',
  HistoricoRutas = 'Historico de Rutas ([02-03-22, 3], [03-05-23, 1])'
}

/**
 * Clase GrupoColeccion que alberga
 * @param _grupos Colección de grupos
 */
export class GrupoColeccion {
  protected _grupos : Grupo[];
  protected _ultID : number;

  /**
   * Constructor de la clase GrupoColeccion
   * @param grupos Colección de grupos
   */
  constructor(grupos : Grupo[]) {
    this._grupos = grupos;
    if (grupos.length != 0) {
      this._ultID = grupos[grupos.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }

  /**
   * Método para insertar un grupo a la colección
   * @param nombre Nombre propio de grupo
   * @param participantes IDs de los miembros del grupo
   * @param estadisticasEntrenamiento Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
   * @param clasificacion Ranking de los grupos que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los grupos por la cantidad de km totales o desnivel total que han acumulado
   * @param rutasFavoritas  Rutas que los grupos del grupo han realizado con mayor frecuencia en sus salidas conjuntas
   * @param historicoRutas todas las rutas que ha realizado el grupo en conjunto
  */
  insertarGrupo(nombre : string, participantes : number[], estadisticasEntrenamiento : EstadisticasEntrenamiento,  
    clasificacion : Usuario[], rutasFavoritas : number[], historicoRutas : HistoricoRuta[], adminID: number = 0) {
    this._grupos.push(new Grupo(++this._ultID, nombre, participantes, estadisticasEntrenamiento, clasificacion, rutasFavoritas, historicoRutas, adminID));
  }


  /**
   * Obtener la posición en el array _grupos
   * donde se encuentra el grupo según su ID
   * @param IDGrupo ID del grupo
   */
  devolverIndexGrupo(IDGrupo: number) : number {
    let grupoIndex: number = 0;

    this._grupos.forEach((grupo, index) => {
      if(grupo.ID ==  IDGrupo) {
        grupoIndex = index;
      }
    })

    return grupoIndex;
  }
  /**
   * Método para añadir un usuario a un grupo
   * @param IDGrupo ID del grupo al que añadir al usuario
   * @param IDUsuario ID del usuario a añadir al grupo
   */
  anadirUsuario (IDGrupo : number, IDUsuario : number) {
    this._grupos[this.devolverIndexGrupo(IDGrupo)].incluirUsuario(IDUsuario);
    
  } 

  /**
   * Método para eliminar un grupo de la colección
   * @param ID ID unico de cada grupo
   * @returns un valor logico si se pudo elimnar el grupo o no
   */
  borrarGrupo (ID: number) : boolean {
    let flag: boolean = false;
    this._grupos.forEach((grupo, index) => {
      if (grupo.ID == ID) {
        this._grupos.splice(index, 1);
        flag = true;
      }
    })

    return flag;
  }

  /**
   * Método para modificar un atributo de un grupo de la colección
   * @param ID ID único del frupo
   * @param atributoModificar Atributo a modificar
   * @param nuevoAtributo Valor del nuevo atributo
   * @returns un valor logico si se pudo modificar el atributo o no
   */
  modificarGrupo(ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
    let flag: boolean = false;
    this._grupos.forEach((grupo, index) => {
      if (grupo.ID == ID) {
        switch (atributoModificar) {
          case AtributosGrupo.Nombre:
            this._grupos[index].nombre = nuevoAtributo;
            break;

          case AtributosGrupo.Participantes:
            this._grupos[index].participantes = nuevoAtributo.split(',').map(Number);
            break;

          case AtributosGrupo.Entrenamiento:
            let entrenamientoStr: string[] = nuevoAtributo.split(', ');
            this._grupos[index].estadisticasEntrenamiento[0] = Number(entrenamientoStr[0]);
            this._grupos[index].estadisticasEntrenamiento[1] = Number(entrenamientoStr[1]);
            this._grupos[index].estadisticasEntrenamiento[2] = entrenamientoStr[2];
            this._grupos[index].estadisticasEntrenamiento[3] = Number(entrenamientoStr[3]);
            break;

          case AtributosGrupo.RutasFavoritas:
            this._grupos[index].rutasFavoritas = nuevoAtributo.split(',').map(Number);
            break;

          case AtributosGrupo.HistoricoRutas:
            let historicoRutasStr: string[] = nuevoAtributo.replaceAll('[', '').replaceAll(' ', '').replaceAll('],', '|').replaceAll(']', '').split('|');
            let historicoRutasAux: HistoricoRuta[] = [];
            historicoRutasStr.forEach(historico => {
              let aux: string[] = (historico.split(','));
              historicoRutasAux.push([aux[0], Number(aux[1])]);
            })
          this._grupos[index].historicoRutas = historicoRutasAux;
          break;
  
        }
        flag = true;
      }
    })

    return flag;
  }

  /**
   * Método para retornar los Grupos correspondientes a una colección de IDs
   * @param gruposIds Ids de los grupos a buscar
   * @returns un array de Grupos que coinciden con los IDs introducidos
   */
  buscarGrupos(gruposIDs: number[]) : Grupo[] {
    let grupos: Grupo[] = [];

    this._grupos.forEach(grupo => {
      gruposIDs.forEach(grupoID => {
        if(grupo.ID ==  grupoID) {
          grupos.push(grupo);
        }
      })
    })

    return grupos;
  }


  /**
  * Método para mostrar una serie de atributos de un grupo de la colección
  * @param ordenacion opción de ordenación
  * @param orientacion opción de orientación
  * @returns un valor logico si se pudo mostrar correctamente la información por pantalla
  */
  mostrarGrupos(ordenacion: string, orientacion : string) : boolean {

    switch (ordenacion) {
      case AtributosOrdenacionGrupo.Nombre:
          switch (orientacion) {
            case AtributosOrdenacionOrientacion.Ascendente:
              this._grupos.sort((a, b) => {
                return b.nombre.localeCompare(a.nombre);
              });
              break;
          
            case AtributosOrdenacionOrientacion.Descendente:
              this._grupos.sort((a, b) => {
                return a.nombre.localeCompare(b.nombre);
              });
              break;
          }
        break;
      
      case AtributosOrdenacionGrupo.Kms:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._grupos.sort((a, b) => b.estadisticasEntrenamiento[0] - a.estadisticasEntrenamiento[0]); // Orden ascendente
            break;
          
          case AtributosOrdenacionOrientacion.Descendente:
            this._grupos.sort((a, b) => a.estadisticasEntrenamiento[0] - b.estadisticasEntrenamiento[0]); // Orden descendente
            break;
        }
        break;
      
      case AtributosOrdenacionGrupo.Miembros:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._grupos.sort((a, b) => b.participantes.length - a.participantes.length); // Orden ascendente
            break;
          
          case AtributosOrdenacionOrientacion.Descendente:
            this._grupos.sort((a, b) => a.participantes.length - b.participantes.length); // Orden descendente
            break;
        }
        break;

    }

    this._grupos.forEach(grupo => {
      grupo.mostrarGrupo();
      console.log('\n');
    });

    this._grupos.sort((a, b) => a.ID - b.ID); // Orden descendente

    return true;
  }

  /**
   * Verifica a través de una ID si dicho grupo
   * existe o no, retornando un valor lógico
   * @param ID
   * @return boolean
   */
  existeGrupo(ID: number): boolean {
    let result: boolean = false;
    this._grupos.forEach(grupo => {
      if(grupo.ID === ID) {
        result = true;
      }
    });
    return result;
  }

  /** 
   * Busca cuál es el administrador de un grupo,
   * recibiendo la ID del mismo y retornando la ID del usuario administrador
   * @param IDGrupo
   * @retum number
   */
  buscarAdministrador(IDGrupo : number) : number {
    return this._grupos[this.devolverIndexGrupo(IDGrupo)].administrador;
  }


}