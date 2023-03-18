import 'mocha';
import { expect } from "chai";
import { holaMundo } from "../src/holaMundo";

describe('Test para holaMundo', () => {
  it('Prueba', () => {
    expect(holaMundo("Hola Mundo")).to.be.eql("Hola Mundo");
  })
})