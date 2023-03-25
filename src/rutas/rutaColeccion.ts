import { Actividad, Coordenada, Ruta } from "./ruta";
import { AtributosOrdenacionRuta } from "./rutaPrompt";
import { AtributosOrdenacionOrientacion } from "..";

export enum AtributosRuta {
  Nombre = 'Nombre',
  CoordenadasInicio = 'Coordenadas del Inicio (15, 16, 22, N)',
  CoordenadasFinal = 'Coordenadas del Final (15, 16, 22, N)',
  Longitud = 'Longitud de la ruta Km (15)',
  DesnivelMedio = 'Desnivel medio de la ruta (15)',
  Usuarios = 'IDs de los usuarios que han realizado la ruta (1, 2, 3)',
  Actividad = 'Actividad (Correr o Bicicleta)',
  CalificacionMedia = 'Calificacion media de la ruta (8)'
}



/**
 * Clase RutaColeccion que alberga
 * @param _rutas Colección de rutas
 * @param _ultID Ultimo ID usado
 */
export class RutaColeccion {
  protected _rutas: Ruta[];
  protected _ultID: number;

  /**
   * Constructor de la clase RutaColeccion
   * @param rutas Colección de rutas
   */
  constructor(rutas: Ruta[]) {
    this._rutas = rutas;
    if (rutas.length != 0) {
      this._ultID = rutas[rutas.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }
  
  /**
   * Método para insertar una ruta a la colección
   * @param nombre Nombre de la ruta
   * @param geolocalizacionInicio Geolocalización del inicio (coordenadas)
   * @param geolocalizacionFinal Geolocalización del final de la ruta (coordenadas)
   * @param longitud Longitud de la ruta en kilometros
   * @param desnivelMedio Desnivel medio de la ruta
   * @param usuariosRealizaron Usuarios que han realizado la ruta (IDs)
   * @param tipoActividad Tipo de actividad: bicicleta o correr
   * @param calificacionMedia Calificación media de la ruta
   */
  insertarRuta(nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
               desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {

    this._rutas.push(new Ruta(++this._ultID, nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia));
  }

  /**
   * Método para eliminar una ruta de la colección
   * @param ID ID unico de cada ruta
   * @returns un valor logico si se pudo elimnar la ruta o no
   */
  borrarRuta(ID: number) : boolean {
    let flag: boolean = false;

    this._rutas.forEach((ruta, index) => {
      if (ruta.ID == ID) {
        this._rutas.splice(index, 1);
        flag = true;
      }
    })

    return flag;
  }

  /**
   * Método para modificar un atributo de una ruta de la colección
   * @param ID ID único de la ruta
   * @param atributoModificar Atributo a modificar
   * @param nuevoAtributo Valor del nuevo atributo
   * @returns un valor logico si se pudo modificar el atributo o no
   */
  modificarRuta(ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
    let flag: boolean = false;
    this._rutas.forEach((ruta, index) => {
      if (ruta.ID == ID) {
        switch (atributoModificar) {
          case AtributosRuta.Nombre:
            this._rutas[index].nombre = nuevoAtributo;
            break;

          case AtributosRuta.CoordenadasInicio:
            let coordenadaInicioStr: string[] = nuevoAtributo.split(', ');
            this._rutas[index].geolocalizacionInicio[0] = Number(coordenadaInicioStr[0]);
            this._rutas[index].geolocalizacionInicio[1] = Number(coordenadaInicioStr[1]);
            this._rutas[index].geolocalizacionInicio[2] = Number(coordenadaInicioStr[2]);
            switch (coordenadaInicioStr[3]) {
              case 'N': this._rutas[index].geolocalizacionInicio[3] = 'N'; break;
              case 'S': this._rutas[index].geolocalizacionInicio[3] = 'S'; break;
              case 'E': this._rutas[index].geolocalizacionInicio[3] = 'E'; break;
              case 'O': this._rutas[index].geolocalizacionInicio[3] = 'O'; break;
            }
            break;

          case AtributosRuta.CoordenadasFinal:
            let coordenadaFinStr: string[] = nuevoAtributo.split(', ');
            this._rutas[index].geolocalizacionFinal[0] = Number(coordenadaFinStr[0]);
            this._rutas[index].geolocalizacionFinal[1] = Number(coordenadaFinStr[1]);
            this._rutas[index].geolocalizacionFinal[2] = Number(coordenadaFinStr[2]);
            switch (coordenadaFinStr[3]) {
              case 'N': this._rutas[index].geolocalizacionFinal[3] = 'N'; break;
              case 'S': this._rutas[index].geolocalizacionFinal[3] = 'S'; break;
              case 'E': this._rutas[index].geolocalizacionFinal[3] = 'E'; break;
              case 'O': this._rutas[index].geolocalizacionFinal[3] = 'O'; break;
            }
            break;

          case AtributosRuta.Longitud:
            this._rutas[index].longitud = Number(nuevoAtributo);
            break;
          
          case AtributosRuta.DesnivelMedio:
            this._rutas[index].desnivelMedio = Number(nuevoAtributo);
            break;

          case AtributosRuta.Usuarios:
            this._rutas[index].usuariosRealizaron = nuevoAtributo.split(',').map(Number);
            break;

          case AtributosRuta.Actividad:
            if (nuevoAtributo == 'Correr') {
              this._rutas[index].tipoActividad = 'Correr';
            }
            else if (nuevoAtributo == 'Bicicleta') {
              this._rutas[index].tipoActividad = 'Bicicleta';
            }       
            break;
          
          case AtributosRuta.CalificacionMedia:
            this._rutas[index].calificacionMedia = Number(nuevoAtributo);
            break;
        }
        flag = true;
      }
    })

    return flag;
  }

  /**
   * Método para retornar las Rutas correspondientes a una colección de IDs
   * @param usuariosIds Ids de las rutas a buscar
   * @returns un array de Rutas que coinciden con los IDs introducidos
   */
  buscarRutas(rutasIds: number[]) : Ruta[] {
    let rutas: Ruta[] = [];

    this._rutas.forEach(ruta => {
      rutasIds.forEach(rutaId => {
        if(ruta.ID ==  rutaId) {
          rutas.push(ruta);
        }
      })
    })

    return rutas;
  }

    /**
  * Método para mostrar una serie de atributos de una ruta de la colección
  * @param ordenacion opción de ordenación
  * @param orientacion opción de orientación
  * @returns un valor logico si se pudo mostrar correctamente la información por pantalla
  */
  mostrarRuta(ordenacion: string, orientacion : string) : boolean {

    switch (ordenacion) {
      case AtributosOrdenacionRuta.Nombre:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._rutas.sort((a, b) => {
            return b.nombre.localeCompare(a.nombre);
          });
          break;
            
          case AtributosOrdenacionOrientacion.Descendente:
            this._rutas.sort((a, b) => {
              return a.nombre.localeCompare(b.nombre);
            });
            break;
        }
        break;
        
      case AtributosOrdenacionRuta.Usuarios:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente: 
            this._rutas.sort((a, b) => b.usuariosRealizaron[0] - a.usuariosRealizaron[0]); // Orden ascendente
            break;
            
          case AtributosOrdenacionOrientacion.Descendente:
            this._rutas.sort((a, b) => a.usuariosRealizaron[0] - b.usuariosRealizaron[0]); // Orden descendente
            break;
          }
        break;
        
      case AtributosOrdenacionRuta.Longitud:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._rutas.sort((a, b) => b.longitud - a.longitud); // Orden ascendente
            break;
            
          case AtributosOrdenacionOrientacion.Descendente:
            this._rutas.sort((a, b) => a.longitud - b.longitud); // Orden descendente
            break;
        }
        break;

      case AtributosOrdenacionRuta.Calificacion:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._rutas.sort((a, b) => b.calificacionMedia - a.calificacionMedia); // Orden ascendente
            break;
            
          case AtributosOrdenacionOrientacion.Descendente:
            this._rutas.sort((a, b) => a.calificacionMedia - b.calificacionMedia); // Orden descendente
            break;
        }
        break;

      case AtributosOrdenacionRuta.Actividad:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._rutas.sort((a, b) => {
              return b.tipoActividad.localeCompare(a.tipoActividad);
            });
            break;
            
          case AtributosOrdenacionOrientacion.Descendente:
            this._rutas.sort((a, b) => {
              return a.tipoActividad.localeCompare(b.tipoActividad);
            });
            break;
        }
        break;
  
    }
    this._rutas.forEach(ruta => {
      ruta.mostrarRuta();
      console.log('\n');
    });
  
    return true;
  }
}

