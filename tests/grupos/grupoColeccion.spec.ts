import 'mocha';
import { expect } from "chai";
import { Grupo, Usuario, GrupoColeccion} from "../../src/internal";

/*describe('Tests para la clase GrupoColeccion', () => {
    it('Se puede crear un objeto de la clase GrupoColeccion', () => {
        let usuario1: Usuario = new Usuario(1, 'Sharon', 'Bicicleta', [5], [[1]], [25, 9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]);
        let grupo1: Grupo = new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [usuario1], [3], [['09-09-22', 5]]);
        expect(new GrupoColeccion([grupo1])).not.to.be.undefined;
    })
    it('Tests para método insertarGrupo', () => {
        let coleccion = new GrupoColeccion([]);

        coleccion.insertarGrupo('Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3, 5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]);
        coleccion.insertarGrupo('Supervivientes', [5], [45, 23, 'Junio', 2023], [new Usuario(5, 'Juan', 'Bicicleta', [9],[[2]], [27, 2, 'Mayo', 2023], [3, 6, 9], [3], [['01-02-21', 1]])], [3], [['09-09-22', 5]]);
    })
    it('Tests para método borrarGrupo', () => {
        let grupo1: Grupo = new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])], [3], [['09-09-22', 5]]);
        let grupo2: Grupo = new Grupo(2, 'Supervivientes', [5], [45, 23, 'Junio', 2023], [new Usuario(5, 'Juan', 'Bicicleta', [9],[[2]], [27, 2, 'Mayo', 2023], [3, 6, 9], [3], [['01-02-21', 1]])], [3], [['09-09-22', 5]])
        let coleccion = new GrupoColeccion([grupo1, grupo2]);
    
        expect(coleccion.borrarGrupo(1)).to.be.true;
        expect(coleccion.borrarGrupo(3)).to.be.false;
        expect(coleccion.borrarGrupo(2)).to.be.true;    
    })
    it('Tests para método modificarGrupo', () => {
        let grupo1: Grupo = new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])], [3], [['09-09-22', 5]]);
        let grupo2: Grupo = new Grupo(2, 'Supervivientes', [5], [45, 23, 'Junio', 2023], [new Usuario(5, 'Juan', 'Bicicleta', [9],[[2]], [27, 2, 'Mayo', 2023], [3, 6, 9], [3], [['01-02-21', 1]])], [3], [['09-09-22', 5]])
        let coleccion = new GrupoColeccion([grupo1, grupo2]);
        
        expect(coleccion.modificarGrupo(1, 'Nombre', 'Expertos')).to.be.true;
        expect(coleccion.modificarGrupo(3, 'Participantes (1, 2, 3)', 'Bicicleta')).to.be.false;
        expect(coleccion.modificarGrupo(2, 'Entrenamiento (km, desnivel, mes, año)', '45, 23, Junio, 2023')).to.be.true;
        expect(coleccion.modificarGrupo(1, 'Rutas Favoritas (1, 2, 3)', '3')).to.be.true;
        expect(coleccion.modificarGrupo(2, 'Historico de Rutas ([02-03-22, 3], [03-05-23, 1])', '[09-09-22, 5]')).to.be.true;
    })
    it('Tests para método buscarGrupo', () => {
        let grupo1: Grupo = new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])], [3], [['09-09-22', 5]]);
        let grupo2: Grupo = new Grupo(2, 'Supervivientes', [5], [45, 23, 'Junio', 2023], [new Usuario(5, 'Juan', 'Bicicleta', [9],[[2]], [27, 2, 'Mayo', 2023], [3, 6, 9], [3], [['01-02-21', 1]])], [3], [['09-09-22', 5]])
        let coleccion = new GrupoColeccion([grupo1, grupo2]);
    
        expect(coleccion.buscarGrupos([1, 2])).to.be.eql([grupo1, grupo2]);
        expect(coleccion.buscarGrupos([3])).to.be.eql([]);
        expect(coleccion.buscarGrupos([2])).to.be.eql([grupo2]);
      })
})*/