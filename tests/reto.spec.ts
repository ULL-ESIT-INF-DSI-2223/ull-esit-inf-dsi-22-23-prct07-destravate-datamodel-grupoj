import 'mocha';
import { expect } from "chai";
import { Usuario } from "../src/usuario";
import { Ruta } from '../src/ruta';
import { Reto } from '../src/reto';

describe('Clase Reto Tests', () => {
  it('Constructor', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])])).not.to.be.eql(null);
  })
  it('get ID', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).ID).to.be.equal(3);
  })
  it('get Nombre', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).nombre).to.be.equal('La Muerte');
  })
  it('get Rutas que forman parte del reto', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).rutas).to.be.eql([new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)]);
  })
  it('get Tipo de actividad ', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).tipoActividad).to.be.eql('Correr');
  })
  it('get Km totales a realizar', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).kilometrosTotales).to.be.equal(23);
  })
  it('get Usuarios que están realizando el reto', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).usuarios).to.be.eql([new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]);
  })
  it('set ID', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).ID = 2).to.be.equal(2);
  })
  it('set Nombre', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).nombre = 'Fantasía').to.be.equal('Fantasía');
  })
  it('set Rutas que forman parte del reto', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).rutas = [new Ruta(6, 'Manhattan', [123, 32, 8, 'O'], [122, 56, 8, 'O'], 23, 12, [1,2,7], 'Correr', 3)]).to.be.eql([new Ruta(6, 'Manhattan', [123, 32, 8, 'O'], [122, 56, 8, 'O'], 23, 12, [1,2,7], 'Correr', 3)]);
  })
  it('set Tipo de actividad ', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).tipoActividad = 'Bicicleta').to.be.eql('Bicicleta');
  })
  it('set Km totales a realizar', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).kilometrosTotales = 65).to.be.equal(65);
  })
  it('set Usuarios que están realizando el reto', () => {
    expect(new Reto(3, 'La Muerte',[new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Correr', 4)], 'Correr', [new Usuario(2, 'Sharon', 'Correr', [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])]).usuarios = [new Usuario(7, 'Javier', 'Correr', [2, 5], [[9]], [25,9, 'Diciembre', 2023], [1, 3], [1], [['02-01-22', 3], ['02-08-23', 1]])]).to.be.eql([new Usuario(7, 'Javier', 'Correr', [2, 5], [[9]], [25,9, 'Diciembre', 2023], [1, 3], [1], [['02-01-22', 3], ['02-08-23', 1]])]);
  })
})