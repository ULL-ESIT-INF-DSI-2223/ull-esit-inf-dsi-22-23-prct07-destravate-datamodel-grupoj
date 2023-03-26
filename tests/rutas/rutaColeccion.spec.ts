import 'mocha';
import { expect } from "chai";
import { Ruta} from "../../src/rutas/ruta";
import { RutaColeccion } from '../../src/rutas/rutaColeccion';

describe('Tests para la clase RutaColeccion', () => {
    it('Se puede crear un objeto de la clase RutaColeccion', () => {
        let ruta1: Ruta = new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4);
        expect(new RutaColeccion([ruta1])).not.to.be.undefined;
    })
    it('Tests para método insertarRuta', () => {
        let coleccion = new RutaColeccion([]);

        coleccion.insertarRuta('La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4);
        coleccion.insertarRuta('La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,6,7], 'Correr', 7);
    })
    it('Tests para método borrarRuta', () => {
        let ruta1: Ruta = new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4);
        let ruta2: Ruta = new Ruta(2, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,6,7], 'Correr', 7);
        let coleccion = new RutaColeccion([ruta1, ruta2]);

        expect(coleccion.borrarRuta(1)).to.be.false;
        expect(coleccion.borrarRuta(3)).to.be.true;
        expect(coleccion.borrarRuta(2)).to.be.true;
    })
    it('Tests para método modificarRuta', () => {
        let ruta1: Ruta = new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4);
        let ruta2: Ruta = new Ruta(2, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,6,7], 'Correr', 7);
        let coleccion = new RutaColeccion([ruta1, ruta2]);

        expect(coleccion.modificarRuta(2, 'Nombre', 'La Caldera')).to.be.true;
        expect(coleccion.modificarRuta(3, 'Actividad (Correr o Bicicleta)', 'Bicicleta')).to.be.true;
        expect(coleccion.modificarRuta(1, 'Actividad (Correr o Bicicleta)', 'Correr')).to.be.false;
        expect(coleccion.modificarRuta(2, 'Actividad (Correr o Bicicleta)', 'Correr')).to.be.true;
        expect(coleccion.modificarRuta(1, 'Calificacion media de la ruta (8)', '2')).to.be.false;
        expect(coleccion.modificarRuta(2, 'Calificacion media de la ruta (8)', '7')).to.be.true;
        expect(coleccion.modificarRuta(3, 'Calificacion media de la ruta (8)', '4')).to.be.true;
        expect(coleccion.modificarRuta(1, 'IDs de los usuarios que han realizado la ruta (1, 2, 3)', '2')).to.be.false;
        expect(coleccion.modificarRuta(2, 'IDs de los usuarios que han realizado la ruta (1, 2, 3)', '1, 2, 6, 7')).to.be.true;
        expect(coleccion.modificarRuta(3, 'IDs de los usuarios que han realizado la ruta (1, 2, 3)', '1, 2, 3, 4, 5, 6, 7')).to.be.true;
    })
    it('Tests para método buscarRutas', () => {
        let ruta1: Ruta = new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4);
        let ruta2: Ruta = new Ruta(2, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,6,7], 'Correr', 7);
        let coleccion = new RutaColeccion([ruta1, ruta2]);

        expect(coleccion.buscarRutas([3, 2])).to.be.eql([ruta1, ruta2]);
        expect(coleccion.buscarRutas([1])).to.be.eql([]);
        expect(coleccion.buscarRutas([2])).to.be.eql([ruta2]);
      })
})