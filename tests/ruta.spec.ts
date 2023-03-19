import 'mocha';
import { expect } from "chai";
import { Usuario } from "../src/usuario";
import { Ruta } from '../src/ruta';

describe('Clase Ruta Tests', () => {
    it('Constructor', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4)).not.to.be.eql(null);
    })
    it('get ID', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).ID).to.be.equal(3);
    })
    it('get Nombre', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).nombre).to.be.equal('La Caldera');
    })
    it('get Geolocalización del inicio', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).geolocalizacionInicio).to.be.eql([90, 34, 21, 'N']);
    })
    it('get Geolocalización del final', () => {
        expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).geolocalizacionFinal).to.be.eql([76, 31, 61, 'S']);
    })
    it('get Longitud', () => {
        expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).longitud).to.be.equal(23);
    })
    it('get Desnivel medio', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).desnivelMedio).to.be.equal(12);
    })
    it('get Usuarios que han realizado la ruta', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).usuariosRealizaron).to.be.eql([1,2,3,4,5,6,7]);
    })
    it('get Actividad', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).tipoActividad).to.be.eql('Bicicleta');
    })
    it('get Calificación', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).calificacionMedia).to.be.eql(4);
    })
    it('set ID', () => {
      let ruta1 = new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4);
      ruta1.ID = 8;
      expect(ruta1.ID).to.be.equal(8);
    })
    it('set Nombre', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).nombre = 'La Caldera').to.be.equal('La Caldera');
    })
    it('set Geolocalización del inicio', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).geolocalizacionInicio= [95, 34, 21, 'N']).to.be.eql([95, 34, 21, 'N']);
    })
    it('set Geolocalización del final', () => {
        expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).geolocalizacionFinal= [71, 31, 61, 'S']).to.be.eql([71, 31, 61, 'S']);
    })
    it('set Longitud', () => {
        expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).longitud= 43).to.be.eql(43);
    })
    it('set Desnivel Medio', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).desnivelMedio= 23).to.be.eql(23);
    })
    it('set Usuarios que han realizado la ruta', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).usuariosRealizaron= [1,5,8]).to.be.eql([1,5,8]);
    })
    it('set Actividad', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).tipoActividad= 'Correr').to.be.eql('Correr');
    })
    it('set Calificación', () => {
      expect(new Ruta(3, 'La Caldera', [90, 34, 21, 'N'], [76, 31, 61, 'S'], 23, 12, [1,2,3,4,5,6,7], 'Bicicleta', 4).calificacionMedia= 3).to.be.eql(3);
    })
})