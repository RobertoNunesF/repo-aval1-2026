import { MEDIA_APROVACAO, MEDIA_RECUPERACAO, NOTA_MAXIMA, NOTA_MINIMA } from './config.js';

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

  const notaInvalida = notas.find((nota) => !ehNotaValida(nota));

  if (notaInvalida !== undefined) {
    throw new Error(
      `Nota inválida: ${notaInvalida}. Use valores entre ${NOTA_MINIMA} e ${NOTA_MAXIMA}.`
    );
  }

  const soma = notas.reduce((acumulador, nota) => acumulador + nota, 0);

  return soma / notas.length;
}

/**
 * Retorna a situação do aluno de acordo com a média.
 *
 * @param {number} media
 * @returns {string} "Aprovado", "Recuperação" ou "Reprovado"
 */
export function obterSituacao(media) {
  if (media > MEDIA_APROVACAO) {
    return 'Aprovado';
  }

  if (media >= MEDIA_RECUPERACAO) {
    return 'Recuperação';
  }

  return 'Reprovado';
}
