# Tarefas da avaliação

As tarefas são **pequenas de propósito**. O que está sendo avaliado não é a dificuldade do código,
e sim **como a equipe trabalha com Git**: branches, commits, merges, conflitos e Pull Request.

Antes de começar, **analisem o repositório**:

- leiam o [README](README.md) e o [guia de contribuição](CONTRIBUTING.md);
- leiam `src/config.js`, `src/media.js`, `src/index.js` e `tests/media.test.js`;
- rodem `npm test`, `npm start -- 7 8 9` e `git log --oneline --graph`, e observem o padrão das branches e das mensagens.

Cada tarefa deve **seguir o padrão que já existe no repositório**.

## Sumário

- [Divisão das tarefas](#divisão-das-tarefas)
- [Roteiro de cada tarefa](#roteiro-de-cada-tarefa)
- [TAREFA-01 — Integrantes da equipe](#tarefa-01--integrantes-da-equipe)
- [TAREFA-02 — Média 7,0 aparece como "Recuperação"](#tarefa-02--média-70-aparece-como-recuperação)
- [TAREFA-03 — Testes para notas inválidas](#tarefa-03--testes-para-notas-inválidas)
- [TAREFA-04 — Simplificar o cálculo da média](#tarefa-04--simplificar-o-cálculo-da-média)
- [TAREFA-05 — Exibir a média com uma casa decimal](#tarefa-05--exibir-a-média-com-uma-casa-decimal)
- [TAREFA-06 — Situação "Aprovado com distinção"](#tarefa-06--situação-aprovado-com-distinção)
- [TAREFA-07 — Versão 1.1.0](#tarefa-07--versão-110)
- [Conflitos esperados](#conflitos-esperados)

---

## Divisão das tarefas

| Tarefa    | Resumo                                                  | Quem faz                              |
| --------- | ------------------------------------------------------- | ------------------------------------- |
| TAREFA-01 | Adicionar seu nome na seção **Equipe** do README        | **Cada** integrante, na própria branch |
| TAREFA-02 | Corrigir a situação de quem tem média exatamente 7,0    | Um integrante                         |
| TAREFA-03 | Escrever testes para notas inválidas                    | Um integrante                         |
| TAREFA-04 | Reescrever o cálculo da média sem o laço `for`          | Um integrante                         |
| TAREFA-05 | Exibir a média com uma casa decimal                     | Um integrante                         |
| TAREFA-06 | Criar a situação "Aprovado com distinção"               | Um integrante                         |
| TAREFA-07 | Publicar a versão 1.1.0                                 | Um integrante, **por último**         |

Regras da divisão:

- **Todos** fazem a TAREFA-01.
- As tarefas 02 a 07 são divididas entre os integrantes, e **cada integrante deve ser responsável por pelo menos uma** delas.
- As tarefas 01 a 06 podem ser feitas **ao mesmo tempo**. A TAREFA-07 só começa depois que todas as outras estiverem na `main`.
- Registrem a divisão no Pull Request.

---

## Roteiro de cada tarefa

1. `git switch main` e `git pull origin main`.
2. Descubra o **tipo** da mudança (veja a tabela de tipos no [guia de contribuição](CONTRIBUTING.md#tipos)) e crie a branch:
   `git switch -c <tipo>/tarefa-XX-descricao-curta`.
3. Faça a alteração e rode `npm test`.
4. Faça um ou mais commits **no padrão Conventional Commits**, escritos por você.
5. `git push -u origin <sua-branch>`.
6. Faça o merge na `main` local com `git merge --no-ff`, rode `npm test` e `git push origin main`.
7. Confira os critérios de aceite da tarefa.

---

## TAREFA-01 — Integrantes da equipe

**Categoria:** documentação · **Quem:** cada integrante, em uma branch própria

Na seção **👥 Equipe** do [README](README.md#-equipe), adicione **uma linha** na tabela com o seu nome
completo e o seu usuário do GitHub. O primeiro integrante a fazer a tarefa também preenche o **nome
da equipe**.

**Critérios de aceite**

- [ ] Todos os integrantes aparecem na tabela.
- [ ] Cada linha foi adicionada **pelo próprio integrante**, em um commit de sua autoria.
- [ ] Cada integrante usou a **sua própria branch** (inclua seu usuário no nome da branch).
- [ ] O nome da equipe está preenchido.

> 💡 Como todos alteram o mesmo trecho do README, **haverá conflito**. Na resolução, mantenham as
> linhas de todos. Veja o exemplo em [Resolvendo conflitos](CONTRIBUTING.md#resolvendo-conflitos).

---

## TAREFA-02 — Média 7,0 aparece como "Recuperação"

**Categoria:** correção de defeito

**Relato de um usuário**

> "Lancei as notas 7, 7 e 7 e o sistema informou que estou em **Recuperação**. Pelas regras da
> disciplina, quem tem média 7,0 está **aprovado**."

**Como reproduzir**

```bash
npm start -- 7 7 7
# Média: 7
# Situação: Recuperação   ← deveria ser "Aprovado"
```

Confira as regras na tabela [Regras de avaliação](README.md#regras-de-avaliação) do README e encontre
o defeito no código.

**Critérios de aceite**

- [ ] `npm start -- 7 7 7` exibe `Situação: Aprovado`.
- [ ] Existe um teste automatizado garantindo que a média 7 resulta em `Aprovado`.
- [ ] Todos os outros testes continuam passando.

---

## TAREFA-03 — Testes para notas inválidas

**Categoria:** testes

A função `calcularMedia` recusa notas fora do intervalo de 0 a 10 e valores que não são números,
mas **nenhum teste** verifica esse comportamento.

**Critérios de aceite**

Em `tests/media.test.js`, existem testes verificando que:

- [ ] uma nota negativa gera erro;
- [ ] uma nota maior que 10 gera erro;
- [ ] um valor que não é número (ex.: `NaN` ou o texto `'8'`) gera erro;
- [ ] as notas `0` e `10` são aceitas.

E também:

- [ ] Nenhum arquivo da pasta `src/` foi alterado nesta tarefa.

---

## TAREFA-04 — Simplificar o cálculo da média

**Categoria:** melhoria de código **sem** mudança de comportamento

A função `calcularMedia` usa um laço `for` com índice para validar e somar as notas. Reescreva-a
usando métodos de array do JavaScript, por exemplo `some`/`find` para a validação e `reduce` para a soma.

**Critérios de aceite**

- [ ] `calcularMedia` não usa mais o laço `for`.
- [ ] As mensagens de erro continuam exatamente iguais.
- [ ] Os testes existentes passam **sem nenhuma alteração** nos testes.

---

## TAREFA-05 — Exibir a média com uma casa decimal

**Categoria:** nova funcionalidade

Hoje a média é exibida com muitas casas decimais:

```bash
npm start -- 7 8 8
# Média: 7.666666666666667
```

Crie, em `src/media.js`, a função `formatarMedia(media)`, que devolve o texto da média com **uma
casa decimal** e **vírgula** como separador. Use essa função em `src/index.js`.

| `media`             | `formatarMedia(media)` |
| ------------------- | ---------------------- |
| `7.666666666666667` | `'7,7'`                |
| `7`                 | `'7,0'`                |
| `10`                | `'10,0'`               |
| `5.25`              | `'5,3'`                |

**Critérios de aceite**

- [ ] `npm start -- 7 8 8` exibe `Média: 7,7`.
- [ ] Existem testes de `formatarMedia` com os exemplos da tabela.
- [ ] O exemplo de saída na seção [Como usar](README.md#como-usar) do README foi atualizado.

---

## TAREFA-06 — Situação "Aprovado com distinção"

**Categoria:** nova funcionalidade

A coordenação criou uma nova situação: alunos com média **maior ou igual a 9,0** passam a ser
classificados como **"Aprovado com distinção"**.

**Critérios de aceite**

- [ ] `npm start -- 9 9 9` exibe `Situação: Aprovado com distinção`.
- [ ] `npm start -- 8 8 8` continua exibindo `Situação: Aprovado`.
- [ ] O valor `9` está definido como constante em `src/config.js`, seguindo o padrão das demais (sem número "solto" em `media.js`).
- [ ] Existem testes para as médias `9` e `10` (distinção) e `8.9` (aprovado).
- [ ] A tabela [Regras de avaliação](README.md#regras-de-avaliação) do README foi atualizada.

---

## TAREFA-07 — Versão 1.1.0

**Categoria:** versionamento · **Quando:** depois que as tarefas 01 a 06 estiverem na `main`

As mudanças feitas pela equipe serão publicadas como a versão **1.1.0**. Pelo
[Versionamento Semântico](https://semver.org/lang/pt-BR/), novas funcionalidades compatíveis com a
versão anterior aumentam o número do meio (_minor_).

1. No [CHANGELOG.md](CHANGELOG.md), crie a seção `## [1.1.0] - AAAA-MM-DD` acima da `1.0.0`,
   listando as mudanças da equipe nos grupos **Adicionado**, **Alterado** e **Corrigido**.
2. No `package.json`, altere `version` para `1.1.0`.
3. Faça o merge na `main` normalmente. Depois, **na `main`**, crie a tag e envie-a ao fork:

   ```bash
   git switch main
   git pull origin main
   git tag -a v1.1.0 -m "Versão 1.1.0"
   git push origin v1.1.0
   ```

**Critérios de aceite**

- [ ] O `CHANGELOG.md` possui a seção `1.1.0` com as mudanças das tarefas 02 a 06.
- [ ] O `package.json` está na versão `1.1.0`.
- [ ] A tag anotada `v1.1.0` existe no fork e aponta para um commit da `main` que já contém essas alterações.

---

## Conflitos esperados

Quando tarefas diferentes alteram as mesmas linhas, o segundo merge gera conflito. Isso é
**normal** e resolver corretamente faz parte da avaliação.

| Tarefas                                  | Onde                                                    |
| ---------------------------------------- | ------------------------------------------------------- |
| TAREFA-01 × TAREFA-01 (entre integrantes) | `README.md`, tabela da equipe                          |
| TAREFA-02 × TAREFA-06                    | `src/media.js`, função `obterSituacao`                  |
| TAREFA-02, 03, 05 e 06                   | `tests/media.test.js`, quando os testes são adicionados no mesmo lugar |
| TAREFA-05 × TAREFA-06                    | `README.md`, se as seções editadas forem próximas      |

Na dúvida: **mantenham as alterações dos dois lados**, rodem `npm test` e conversem com o colega
que fez a outra alteração.
