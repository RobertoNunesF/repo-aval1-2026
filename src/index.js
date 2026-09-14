import { calcularMedia, obterSituacao } from './media.js';

const notas = process.argv.slice(2).map(Number);
const media = calcularMedia(notas);

console.log(`Média: ${media}`);
console.log(`Situação: ${obterSituacao(media)}`);
