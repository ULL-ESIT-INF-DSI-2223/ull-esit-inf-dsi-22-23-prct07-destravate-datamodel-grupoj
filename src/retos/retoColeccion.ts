import { Actividad, Ruta, Usuario, Reto } from "../internal";
import { jsonRutasColeccion, jsonUsuariosColeccion, AtributosOrdenacionOrientacion, AtributosOrdenacionReto } from "../internal"

/**
 * Enumerado de los distintos Atributos de un reto
 * @param ID ID único del reto
 * @param nombre Nombre del reto
 * @param rutas Rutas que forman parte del reto
 * @param tipoActividad Tipo de actividad del reto: bicicleta o correr
 * @param usuarios Usuarios que están realizando el reto
 */
export enum AtributosReto {
  Nombre = 'Nombre',
  Rutas = 'IDs de las rutas (1, 2, 3)',
  Actividad = 'Actividad (Correr o Bicicleta)',
  Usuarios = 'IDs de los usuarios (1, 2, 3)'
}

/**
 * Clase RetoColeccion que alberga
 * @param _retos Colección de retos
 * @param _ultID Ultimo ID usado
 */
export class RetoColeccion {
  protected _retos: Reto[];
  protected _ultID: number;

  /**
   * Constructor de la clase RetoColeccion
   * @param retos Colección de retos
   */
  constructor(retos: Reto[]) {
    this._retos = retos;
    if (retos.length != 0) {
      this._ultID = retos[retos.length - 1].ID;
    }
    else {
      this._ultID = 0;
    }
  }

  /**
   * Método para insertar un reto a la colección
   * @param nombre Nombre del reto
   * @param rutas Rutas que forman parte del reto
   * @param tipoActividad Tipo de actividad del reto: bicicleta o correr
   * @param usuarios Usuarios que están realizando el reto
   */
  insertarReto(nombre: string, rutasIds: number[], tipoActividad: Actividad, usuariosIds: number[]) {
    let rutas: Ruta[] = jsonRutasColeccion.buscarRutas(rutasIds);
    let usuarios: Usuario[] = jsonUsuariosColeccion.buscarUsuarios(usuariosIds);

    this._retos.push(new Reto(++this._ultID, nombre, rutas, tipoActividad, usuarios))
  }

  /**
   * Método para eliminar un reto de la colección
   * @param ID ID unico de cada reto
   * @returns un valor logico si se pudo elimnar el reto o no
   */
  borrarReto(ID: number) : boolean {
    let flag: boolean = false;

    this._retos.forEach((reto, index) => {
      if (reto.ID == ID) {
        this._retos.splice(index, 1);
        flag = true;
      }
    })

    return flag;
  }

  /**
   * Método para modificar un atributo de un reto de la colección
   * @param ID ID único del reto
   * @param atributoModificar Atributo a modificar
   * @param nuevoAtributo Valor del nuevo atributo
   * @returns un valor logico si se pudo modificar el atributo o no
   */
  modificarReto(ID: number, atributoModificar: string, nuevoAtributo: string) : boolean {
    let flag: boolean = false;
    this._retos.forEach((reto, index) => {
      if (reto.ID == ID) {
        switch (atributoModificar) {
          case AtributosReto.Nombre:
            this._retos[index].nombre = nuevoAtributo;
            break;

          case AtributosReto.Rutas:
            let rutasIds = nuevoAtributo.split(',').map(Number);
            let rutas: Ruta[] = jsonRutasColeccion.buscarRutas(rutasIds);
            this._retos[index].rutas = rutas;
            this._retos[index].kilometrosTotales = 0;
            rutas.forEach(ruta => {
              this._retos[index].kilometrosTotales += ruta.longitud;
            })
            break;

          case AtributosReto.Actividad:
            if (nuevoAtributo == 'Correr') {
              this._retos[index].tipoActividad = 'Correr';
            }
            else if (nuevoAtributo == 'Bicicleta') {
              this._retos[index].tipoActividad = 'Bicicleta';
            }       
            break;

          case AtributosReto.Usuarios:
            let usuariosIds = nuevoAtributo.split(',').map(Number);
            let usuarios: Usuario[] = jsonUsuariosColeccion.buscarUsuarios(usuariosIds);
            this._retos[index].usuarios = usuarios;
            break;
        }
        flag = true;
      }
    })

    return flag;
  }

  /**
   * Método para mostrar los distintos retos, siguiendo
   * criterios de ordenación 
   * @param ordenación criterio por el que se desea realizar la ordenación
   * @param orientación si la ordenación se debe mostrar por orden ascendente o descendente
   * @returns un valor logico si se pudo mostrar correctamente o no
   */
  mostrarRetos(ordenacion: string, orientacion : string) : boolean {

    switch (ordenacion) {
      case AtributosOrdenacionReto.Nombre:
          switch (orientacion) {
            case AtributosOrdenacionOrientacion.Ascendente:
              this._retos.sort((a, b) => {
                return b.nombre.localeCompare(a.nombre);
              });
              break;
          
            case AtributosOrdenacionOrientacion.Descendente:
              this._retos.sort((a, b) => {
                return a.nombre.localeCompare(b.nombre);
              });
              break;
          }
        break;
      
      case AtributosOrdenacionReto.Kms:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._retos.sort((a, b) => b.kilometrosTotales - a.kilometrosTotales); // Orden ascendente
            break;
          
          case AtributosOrdenacionOrientacion.Descendente:
            this._retos.sort((a, b) => a.kilometrosTotales - b.kilometrosTotales); // Orden descendente
            break;
        }
        break;
      
      case AtributosOrdenacionReto.Miembros:
        switch (orientacion) {
          case AtributosOrdenacionOrientacion.Ascendente:
            this._retos.sort((a, b) => b.usuarios.length - a.usuarios.length); // Orden ascendente
            break;
          
          case AtributosOrdenacionOrientacion.Descendente:
            this._retos.sort((a, b) => a.usuarios.length - b.usuarios.length); // Orden descendente
            break;
        }
        break;

    }

    this._retos.forEach(reto => {
      reto.mostrarReto();
      console.log('\n');
    });

    this._retos.sort((a, b) => a.ID - b.ID); // Orden descendente

    return true;
  }
}