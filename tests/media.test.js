import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { calcularMedia, obterSituacao } from '../src/media.js';

describe('calcularMedia', () => {
  test('retorna a própria nota quando há apenas uma', () => {
    assert.equal(calcularMedia([8]), 8);
  });

  test('calcula a média de várias notas', () => {
    assert.equal(calcularMedia([6, 8, 10]), 8);
  });

  test('aceita notas decimais', () => {
    assert.equal(calcularMedia([7.5, 8.5]), 8);
  });

  test('lança erro quando nenhuma nota é informada', () => {
    assert.throws(() => calcularMedia([]), /Informe ao menos uma nota/);
  });
});

describe('obterSituacao', () => {
  test('retorna "Aprovado" para média acima da média de aprovação', () => {
    assert.equal(obterSituacao(8.5), 'Aprovado');
  });

  test('retorna "Recuperação" para média entre 5 e 7', () => {
    assert.equal(obterSituacao(6), 'Recuperação');
  });

  test('retorna "Recuperação" para média igual a 5', () => {
    assert.equal(obterSituacao(5), 'Recuperação');
  });

  test('retorna "Reprovado" para média abaixo de 5', () => {
    assert.equal(obterSituacao(4.9), 'Reprovado');
  });
});
