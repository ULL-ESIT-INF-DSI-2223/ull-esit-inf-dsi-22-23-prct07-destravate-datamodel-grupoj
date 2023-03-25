import { Actividad, Ruta } from "./ruta";
import { Usuario, Coleccion, HistoricoRuta} from "./usuario";
import { Grupo, EstadisticasEntrenamiento } from "./grupo";

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

  insertarGrupo(ID : number, nombre : string, participantes : number[], estadisticasEntrenamiento : EstadisticasEntrenamiento,  
    clasificacion : Usuario[], rutasFavoritas : Ruta[], historicoRutas : Ruta[]) {
    this._grupos.push(new Grupo(++this._ultID, nombre, participantes, estadisticasEntrenamiento, clasificacion, rutasFavoritas, historicoRutas));
  }

  mostrarGrupos () : void { 
    //this._grupos.sort((a, b) => a.ID - b.ID);    
    this._grupos.forEach(grupo => {
      grupo.mostrarGrupo();
      console.log('\n');
    });
  }

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

  /* modificarUsuario (ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
    let flag: boolean = false;
    this._grupos.forEach((grupo, index) => {
      if (grupo.ID == ID) {
        switch (atributoModificar) {
          case AtributosGrupo.Nombre:
            this._grupos[index].nombre = nuevoAtributo;
            break;

          case AtributosGrupo.Actividad:
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
  }*/
}