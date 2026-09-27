# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o projeto adota o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-09-27

### Adicionado

- Situação "Aprovado com distinção" para médias maiores ou iguais a 9,0.
- Exibição da média com uma casa decimal e vírgula como separador (ex.: `7,7`).
- Testes automatizados para notas inválidas (negativas, acima de 10 ou não numéricas).

### Alterado

- Cálculo da média simplificado com métodos de array (`reduce`), sem mudança de comportamento.

### Corrigido

- Média igual a 7,0 agora é classificada corretamente como "Aprovado" (antes aparecia como "Recuperação").

## [1.0.0] - 2026-09-14

### Adicionado

- Cálculo da média aritmética das notas.
- Classificação da situação do aluno: Aprovado, Recuperação ou Reprovado.
- Execução pela linha de comando (`npm start -- <notas>`).
- Integração contínua com testes e verificação de Conventional Commits.