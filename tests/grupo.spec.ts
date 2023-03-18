import 'mocha';
import { expect } from "chai";
import { Grupo } from "../src/grupo";
import { Usuario } from "../src/usuario";

describe('Clase Grupo Tests', () => {
  it('Constructor', () => {
    expect(new Grupo(1, 'Expertos', [1, 2], [45, 23, 'Junio', 2023], [new Usuario(2, 'Sharon', Bicicleta, [5], [[1]], [25,9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]), new Usuario(1, 'Juan', Bicicleta, [9],[[2]], [20, 14, 'Junio', 2023], [3,5], [3], [['01-02-21', 3], ['09-09-22', 5]])], [new Ruta(3)], [['10-05-23', 3]])).to.be.eql("Hola Mundo");
  })
  it('Prueba', () => {
    expect(holaMundo("Hola Mundo")).to.be.eql("Hola Mundo");
  })
  it('Prueba', () => {
    expect(holaMundo("Hola Mundo")).to.be.eql("Hola Mundo");
  })
  it('Prueba', () => {
    expect(holaMundo("Hola Mundo")).to.be.eql("Hola Mundo");
  })
})