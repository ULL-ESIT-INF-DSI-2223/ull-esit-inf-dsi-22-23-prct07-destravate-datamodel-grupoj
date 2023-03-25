import 'mocha';
import { expect } from "chai";
import { Grupo } from "../../src/grupos/grupo";
import { Usuario } from "../../src/usuarios/usuario";
import { Ruta } from '../../src/rutas/ruta';

describe('Clase Grupo Tests', () => {
  it('Constructor', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]])).not.to.be.eql(null);
  })
  it('get ID', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).ID).to.be.equal(1);
  })
  it('get Nombre', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).nombre).to.be.equal('Expertos');
  })
  it('get Participantes', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).participantes).to.be.eql([1, 2]);
  })
  it('get Estadísticas de entrenamiento', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).estadisticasEntrenamiento).to.be.eql([45, 23, 'Junio', 2023]);
  })
  it('get Clasificación de Usuarios', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).clasificacion).to.be.eql([new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])]);
  })
  it('get Ruta Favorita', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).rutasFavoritas).to.be.eql([3]);
  })
  it('get Histórico de rutas', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).historicoRutas).to.be.eql([['09-09-22', 5]]);
  })
  it('set ID', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).ID = 6).to.be.equal(6);
  })
  it('set Nombre', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).nombre = 'Travesías').to.be.equal('Travesías');
  })
  it('set Participantes', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).participantes = [8,3,4]).to.be.eql([8,3,4]);
  })
  it('set Estadísticas de entrenamiento', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).estadisticasEntrenamiento = [21, 2, 'Mayo', 2020]).to.be.eql([21, 2, 'Mayo', 2020]);
  })
  it('set Clasificación de Usuarios', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).clasificacion = [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).to.be.eql([new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]);
  })
  it('set Ruta Favorita', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])],  [3], [['09-09-22', 5]]).rutasFavoritas = [2]).to.be.eql([2]);
  })
  it('set Histórico de rutas', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', 'Bicicleta', [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [3], [['09-09-22', 5]]).historicoRutas = [['09-09-22', 2]]).to.be.eql([['09-09-22', 2]]);
  })
})