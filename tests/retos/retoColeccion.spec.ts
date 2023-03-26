import 'mocha';
import { expect } from "chai";
import { Reto} from "../../src/retos/reto";
import { Usuario } from "../../src/usuarios/usuario";
import { Ruta } from '../../src/rutas/ruta';
import { RetoColeccion } from '../../src/retos/retoColeccion';

describe('Tests para la clase RetoColeccion', () => {
    // it('Se puede crear un objeto de la clase RetoColeccion', () => {
    //     let reto1: Reto = new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]);
    //     expect(new RetoColeccion([reto1])).not.to.be.null;
    // })

    // it('Tests para método insertarReto', () => {
    //     let coleccion = new RetoColeccion([]);
    //     coleccion.insertarReto('La Muerte',[3], 'Correr', [2]);
    //     coleccion.insertarReto('Huevos de Pascua',[1, 7], 'Correr', [1, 2, 3]);
    // })
    // it('Tests para método borrarReto', () => {
    //     let reto1: Reto = new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]);
    //     let reto2: Reto = new Reto(3, 'Novatos',[new Ruta(1, 'Valverde', [17, 12, 21, 'N'], [72, 12, 11, 'N'], 8, 2, [4,5,6,7], 'Bicicleta', 5)], 'Bicicleta', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]);
    //     let coleccion = new RetoColeccion([reto1, reto2]);

    //     expect(coleccion.borrarReto(1)).to.be.true;
    //     expect(coleccion.borrarReto(3)).to.be.false;
    //     expect(coleccion.borrarReto(2)).to.be.true;
    // })
    // it('Tests para método modificarReto', () => {
    //     let reto1: Reto = new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]);
    //     let reto2: Reto = new Reto(3, 'Novatos',[new Ruta(1, 'Valverde', [17, 12, 21, 'N'], [72, 12, 11, 'N'], 8, 2, [4,5,6,7], 'Bicicleta', 5)], 'Bicicleta', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]);
    //     let coleccion = new RetoColeccion([reto1, reto2]);

    //     expect(coleccion.modificarReto(1, 'Nombre', 'La Muerte')).to.be.true;
    //     expect(coleccion.modificarReto(3, 'IDs de las rutas (1, 2, 3)', '3')).to.be.false;
    //     expect(coleccion.modificarReto(1, 'IDs de las rutas (1, 2, 3)', '3')).to.be.true;
    //     expect(coleccion.modificarReto(2, 'IDs de las rutas (1, 2, 3)', '1')).to.be.true;
    //     expect(coleccion.modificarReto(2, 'Nombre', 'Novatos')).to.be.true;
    //     expect(coleccion.modificarReto(2, 'Actividad (Correr o Bicicleta)', 'Bicicleta')).to.be.true;
    //     expect(coleccion.modificarReto(3, 'Actividad (Correr o Bicicleta)', 'Bicicleta')).to.be.false;
    //     expect(coleccion.modificarReto(1, 'Actividad (Correr o Bicicleta)', 'Correr')).to.be.true;
    //     expect(coleccion.modificarReto(1, 'IDs de los usuarios (1, 2, 3)', '1')).to.be.true;
    //     expect(coleccion.modificarReto(2, 'IDs de los usuarios (1, 2, 3)', '1')).to.be.true;
    // })
})