/**
 * Verifica se as mensagens de commit seguem o padrão Conventional Commits.
 * Especificação: https://www.conventionalcommits.org/pt-br/v1.0.0/
 *
 * Uso:
 *   npm run lint:commits                 Commits que ainda não estão no repositório base
 *                                        (upstream/main..HEAD ou origin/main..HEAD).
 *   npm run lint:commits -- main..HEAD   Um intervalo específico.
 *
 * Commits de merge são ignorados.
 */
import { execFileSync } from 'node:child_process';

const TIPOS = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'];
const TAMANHO_MAXIMO_CABECALHO = 100;
const PADRAO_CABECALHO = /^(?<tipo>[a-z]+)(?:\((?<escopo>[^()\s]+)\))?!?: (?<descricao>\S.*)$/;

function git(...argumentos) {
  return execFileSync('git', argumentos, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function validarMensagem(mensagem) {
  const [cabecalho = '', segundaLinha] = mensagem.split('\n');

  if (/^Revert ".+"$/.test(cabecalho)) {
    return [];
  }

  const resultado = PADRAO_CABECALHO.exec(cabecalho);
  if (!resultado) {
    return ['use o formato "<tipo>(escopo opcional): <descrição>", com o tipo em minúsculas'];
  }

  const erros = [];
  if (!TIPOS.includes(resultado.groups.tipo)) {
    erros.push(`tipo "${resultado.groups.tipo}" inválido; use: ${TIPOS.join(', ')}`);
  }
  if (cabecalho.endsWith('.')) {
    erros.push('a descrição não deve terminar com ponto final');
  }
  if (cabecalho.length > TAMANHO_MAXIMO_CABECALHO) {
    erros.push(`o cabeçalho tem ${cabecalho.length} caracteres (máximo ${TAMANHO_MAXIMO_CABECALHO})`);
  }
  if (segundaLinha !== undefined && segundaLinha.trim() !== '') {
    erros.push('deixe uma linha em branco entre o cabeçalho e o corpo');
  }
  return erros;
}

function intervaloPadrao() {
  for (const referencia of ['upstream/main', 'origin/main']) {
    try {
      git('rev-parse', '--verify', '--quiet', referencia);
      return `${referencia}..HEAD`;
    } catch {
      // referência inexistente: tenta a próxima
    }
  }
  return 'HEAD';
}

const intervalo = process.argv[2] ?? intervaloPadrao();
let saida;

try {
  saida = git('log', '--no-merges', '--format=%h%x1f%B%x1e', '--end-of-options', intervalo, '--');
} catch (erro) {
  console.error(`Não foi possível ler os commits de "${intervalo}":\n${erro.stderr || erro.message}`);
  process.exit(1);
}

const commits = saida
  .split('\x1e')
  .map((registro) => registro.trim())
  .filter(Boolean)
  .map((registro) => {
    const [hash, mensagem] = registro.split('\x1f');
    return { hash, mensagem: mensagem.trim() };
  });

console.log(`Verificando ${commits.length} commit(s) em ${intervalo}\n`);

let invalidos = 0;
for (const { hash, mensagem } of commits) {
  const erros = validarMensagem(mensagem);
  const cabecalho = mensagem.split('\n')[0];

  if (erros.length === 0) {
    console.log(`  ✔ ${hash} ${cabecalho}`);
  } else {
    invalidos += 1;
    console.log(`  ✖ ${hash} ${cabecalho}`);
    erros.forEach((erro) => console.log(`      - ${erro}`));
  }
}

console.log('');
if (invalidos > 0) {
  console.log(`✖ ${invalidos} commit(s) fora do padrão Conventional Commits (veja CONTRIBUTING.md).`);
  process.exitCode = 1;
} else {
  console.log('✔ Todos os commits seguem o padrão Conventional Commits.');
}
