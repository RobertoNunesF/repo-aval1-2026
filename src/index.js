import { calcularMedia, obterSituacao } from './media.js';

const notas = process.argv.slice(2).map(Number);

try {
  const media = calcularMedia(notas);

  console.log(`Média: ${media}`);
  console.log(`Situação: ${obterSituacao(media)}`);
} catch (erro) {
  console.error(`Erro: ${erro.message}`);
  console.error('Uso: npm start -- <nota1> <nota2> [nota3 ...]');
  process.exitCode = 1;
}
