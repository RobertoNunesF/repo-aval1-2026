import { NOTA_MAXIMA, NOTA_MINIMA } from './config.js';

/**
 * Indica se o valor é uma nota válida: um número entre NOTA_MINIMA e NOTA_MAXIMA.
 *
 * @param {unknown} nota
 * @returns {boolean}
 */
export function ehNotaValida(nota) {
  return typeof nota === 'number' && nota >= NOTA_MINIMA && nota <= NOTA_MAXIMA;
}

/**
 * Calcula a média aritmética de uma lista de notas.
 *
 * @param {number[]} notas
 * @returns {number}
 */
export function calcularMedia(notas) {
  if (!Array.isArray(notas) || notas.length === 0) {
    throw new Error('Informe ao menos uma nota.');
  }

  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    if (!ehNotaValida(notas[i])) {
      throw new Error(`Nota inválida: ${notas[i]}. Use valores entre ${NOTA_MINIMA} e ${NOTA_MAXIMA}.`);
    }
    soma = soma + notas[i];
  }

  return soma / notas.length;
}
