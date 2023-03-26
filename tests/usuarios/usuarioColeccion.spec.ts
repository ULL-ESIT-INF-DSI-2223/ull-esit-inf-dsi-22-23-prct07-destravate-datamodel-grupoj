import 'mocha';
import { expect } from "chai";
import { Usuario, Coleccion } from "../../src/usuarios/usuario";
import { UsuarioColeccion } from '../../src/usuarios/usuarioColeccion';

describe('Tests para la clase UsuarioColeccion', () => {
  // it('Se puede crear un objeto de la clase UsuarioColeccion', () => {
  //   let usuario1: Usuario = new Usuario(1, 'Sharon', 'Bicicleta', [5], [[1]], [25, 9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]]);
  //   expect(new UsuarioColeccion([usuario1])).not.to.be.undefined;
  // })

  // it('Tests para método insertarUsuario', () => {
  //   let coleccion = new UsuarioColeccion([]);

  //   coleccion.insertarUsuario('Sharon', 'Bicicleta', [5], [[1]], [25, 9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])
  //   coleccion.insertarUsuario('Ivan', 'Correr', [5, 2], [[1], [2, 3]], [12, 256, 'Enero', 2021], [2, 3], [2], [['01-04-21', 1], ['03-05-23', 4]])
  // })
  // it('Tests para método borrarUsuario', () => {
  //   let usuario1: Usuario = new Usuario(1, 'Sharon', 'Bicicleta', [5], [[1]], [25, 9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])
  //   let usuario2: Usuario = new Usuario(2, 'Ivan', 'Correr', [5, 2], [[1], [2, 3]], [12, 256, 'Enero', 2021], [2, 3], [2], [['01-04-21', 1], ['03-05-23', 4]])
  //   let coleccion = new UsuarioColeccion([usuario1, usuario2]);

  //   expect(coleccion.borrarUsuario(1)).to.be.true;
  //   expect(coleccion.borrarUsuario(3)).to.be.false;
  //   expect(coleccion.borrarUsuario(2)).to.be.true;
  // })
  // it('Tests para método modificarUsuario', () => {
  //   let usuario1: Usuario = new Usuario(1, 'Sharon', 'Bicicleta', [5], [[1]], [25, 9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])
  //   let usuario2: Usuario = new Usuario(2, 'Ivan', 'Correr', [5, 2], [[1], [2, 3]], [12, 256, 'Enero', 2021], [2, 3], [2], [['01-04-21', 1], ['03-05-23', 4]])
  //   let coleccion = new UsuarioColeccion([usuario1, usuario2]);

  //   expect(coleccion.modificarUsuario(1, 'Nombre', 'Pepe')).to.be.true;
  //   expect(coleccion.modificarUsuario(3, 'Actividad (Correr o Bicicleta)', 'Bicicleta')).to.be.false;
  //   expect(coleccion.modificarUsuario(1, 'Actividad (Correr o Bicicleta)', 'Correr')).to.be.true;
  //   expect(coleccion.modificarUsuario(2, 'Actividad (Correr o Bicicleta)', 'Bicicleta')).to.be.true;
  //   expect(coleccion.modificarUsuario(1, 'Amigos APP (1, 2, 3)', '2')).to.be.true;
  //   expect(coleccion.modificarUsuario(2, 'Grupo de Amigos ([1], [2, 3])', '[1], [2, 3]')).to.be.true;
  //   expect(coleccion.modificarUsuario(3, 'Entrenamiento (km, desnivel, mes, año)', '1, 2, Mayo, 3')).to.be.false;
  //   expect(coleccion.modificarUsuario(1, 'Rutas Favoritas (1, 2, 3)', '2')).to.be.true;
  //   expect(coleccion.modificarUsuario(2, 'Retos Activos (1, 2, 3)', '1, 2, 3')).to.be.true;
  //   expect(coleccion.modificarUsuario(2, 'Historico de Rutas ([02-03-22, 3], [03-05-23, 1])', '[03-05-23, 1]')).to.be.true;
  // })

  // it('Tests para método buscarUsuario', () => {
  //   let usuario1: Usuario = new Usuario(1, 'Sharon', 'Bicicleta', [5], [[1]], [25, 9, 'Junio', 2023], [1, 3], [1], [['02-03-22', 3], ['03-05-23', 1]])
  //   let usuario2: Usuario = new Usuario(2, 'Ivan', 'Correr', [5, 2], [[1], [2, 3]], [12, 256, 'Enero', 2021], [2, 3], [2], [['01-04-21', 1], ['03-05-23', 4]])
  //   let coleccion = new UsuarioColeccion([usuario1, usuario2]);

  //   expect(coleccion.buscarUsuarios([1, 2])).to.be.eql([usuario1, usuario2]);
  //   expect(coleccion.buscarUsuarios([3])).to.be.eql([]);
  //   expect(coleccion.buscarUsuarios([2])).to.be.eql([usuario2]);
  // })
})