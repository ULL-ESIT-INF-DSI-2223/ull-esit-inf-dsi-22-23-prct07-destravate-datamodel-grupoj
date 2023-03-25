import 'mocha';
import { expect } from "chai";
import { Usuario, Coleccion } from "../src/usuarios/usuario";

describe('Clase Usuario Tests', () => {
    it('Constructor', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])).not.to.be.eql(null);
    })
    it('get ID', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).ID).to.be.equal(2);
    })
    it('get Nombre', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).nombre).to.be.equal('Sharon');
    })
    it('get Actividades', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).actividades).to.be.eql('Bicicleta');
    })
    it('get Amigos en la App', () => {
        expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).amigosApp).to.be.eql([5]);
    })
    it('get Grupos de Amigos', () => {
        expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).grupoAmigos).to.be.eql([[1]]);
    })
    it('get Estadísticas de entrenamiento', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).entrenamiento).to.be.eql([25,9, 'Junio', 2023]);
    })
    it('get Rutas Favoritas', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).rutasFavoritas).to.be.eql([1, 3]);
    })
    it('get Retos Activos', () => {
        expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).retosActivos).to.be.eql([1]);
    })
    it('get Histórico de rutas', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).historicoRutas).to.be.eql([['02-03-22', 3], ['03-05-23', 1]]);
    })
    it('set ID', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).ID = 5).to.be.equal(5);
    })
    it('set Nombre', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).nombre = 'Raquel').to.be.equal('Raquel');
    })
    it('set Actividades', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).actividades = 'Correr').to.be.eql('Correr');
    })
    it('set Amigos en la App', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).amigosApp = [2, 3]).to.be.eql([2, 3]);
    })
    it('set Grupos de Amigos', () => {
      let g: Coleccion = [[2]];
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).grupoAmigos = g).to.be.eql([[2]]);
    })
    it('set Estadísticas de entrenamiento', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).entrenamiento = [20,9, 'Enero', 2023]).to.be.eql([20,9, 'Enero', 2023]);
    })
    it('set Rutas Favoritas', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).rutasFavoritas = [4, 3]).to.be.eql([4, 3]);
    })
    it('set Retos Activos', () => {
        expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).retosActivos = [7, 3]).to.be.eql([7, 3]);
    })
    it('set Histórico de rutas', () => {
      expect(new Usuario(2, 'Sharon', 'Bicicleta', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]).historicoRutas = [['01-01-22', 4], ['03-05-23', 1]]).to.be.eql([['01-01-22', 4], ['03-05-23', 1]]);
    })
})