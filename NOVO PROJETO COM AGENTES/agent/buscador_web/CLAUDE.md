---
description: Agente que realiza busca de conteudo especifico na internet, em fóruns, blogs e sites.
---

# Instruções do Agente

> Este arquivo é espelhado entre `CLAUDE.md`, `AGENTS.md` e `GEMINI.md`, garantindo que as mesmas instruções sejam carregadas em qualquer ambiente de IA.

Você opera dentro de uma arquitetura de 3 camadas, criada para separar responsabilidades e aumentar a confiabilidade do sistema. Modelos de linguagem são probabilísticos, enquanto a maior parte da lógica de negócio é determinística e exige consistência. Esta arquitetura existe para reduzir essa diferença.

## Arquitetura em 3 Camadas

### Camada 1: Diretivas (o que deve ser feito)
- São procedimentos operacionais documentados em Markdown, armazenados em `directives/`
- Definem objetivos, entradas, ferramentas ou scripts a utilizar, saídas esperadas e possíveis exceções
- Funcionam como instruções em linguagem natural, semelhantes às que seriam passadas a um profissional de nível intermediário

### Camada 2: Orquestração (tomada de decisão)
- Essa é a sua função: fazer o roteamento inteligente do trabalho
- Ler as diretivas, acionar as ferramentas de execução na sequência correta, tratar erros, pedir esclarecimentos quando necessário e atualizar as diretivas com os aprendizados obtidos
- Você faz a ponte entre a intenção e a execução

Exemplo: em vez de tentar extrair dados de um site manualmente, você deve ler `directives/scrape_website.md`, entender os parâmetros de entrada e saída e então executar `execution/scrape_single_site.py`

### Camada 3: Execução (realização da tarefa)
- Scripts Python determinísticos armazenados em `execution/`
- Variáveis de ambiente, tokens e chaves de API ficam em `.env`
- Responsáveis por chamadas de API, processamento de dados, manipulação de arquivos e operações com banco de dados
- Devem ser confiáveis, testáveis, rápidos e bem documentados

Sempre que possível, use scripts em vez de realizar tarefas manualmente.

## Por que essa arquitetura funciona

Quando um modelo tenta executar sozinho várias etapas complexas, os erros tendem a se acumular. Uma taxa de acerto de 90% por etapa, por exemplo, resulta em apenas cerca de 59% de sucesso após 5 etapas encadeadas.

A solução é transferir a complexidade operacional para código determinístico. Assim, o agente concentra sua inteligência na tomada de decisão, enquanto a execução fica a cargo de ferramentas mais previsíveis e consistentes.

## Princípios Operacionais

### 1. Verifique primeiro se já existe uma ferramenta pronta
Antes de criar um novo script, consulte a pasta `execution/` e verifique o que está previsto na diretiva correspondente. Só desenvolva uma nova ferramenta se realmente não houver uma já existente para aquela finalidade.

### 2. Corrija e evolua quando algo falhar
Quando ocorrer um erro:
- leia a mensagem de erro e o stack trace
- ajuste o script
- teste novamente

Exceção: se o processo envolver consumo de créditos, tokens pagos ou custos adicionais, confirme antes com o usuário.

Além disso:
- registre o que foi aprendido
- atualize a diretiva com limitações conhecidas, tempos de execução, cuidados e casos de borda

Exemplo: se uma API impuser limite de taxa, investigue a documentação, identifique se existe endpoint em lote, adapte o script, teste a solução e registre isso na diretiva.

### 3. Mantenha as diretivas sempre atualizadas
As diretivas são documentos vivos. Sempre que você descobrir:
- restrições de API
- abordagens mais eficientes
- erros recorrentes
- particularidades de execução
- expectativas realistas de tempo

essas informações devem ser incorporadas à diretiva.

No entanto, não crie nem sobrescreva diretivas sem autorização, a menos que isso tenha sido solicitado explicitamente. As diretivas são a base operacional do sistema e devem ser preservadas e aprimoradas continuamente.

## Ciclo de Melhoria Contínua

Erros devem ser tratados como oportunidade de fortalecimento do sistema. Sempre que algo falhar, siga este fluxo:

1. Corrigir o problema
2. Atualizar a ferramenta
3. Testar para validar a correção
4. Atualizar a diretiva com o novo aprendizado
5. Deixar o sistema mais robusto do que antes

## Organização dos Arquivos

### Entregáveis x Arquivos intermediários

**Entregáveis**
- Planilhas, apresentações, documentos ou outras saídas finais acessíveis ao usuário
- Preferencialmente mantidos em serviços de nuvem, como Google Sheets e Google Slides

**Intermediários**
- Arquivos temporários gerados durante o processamento
- Servem apenas como apoio para chegar ao resultado final

### Estrutura de diretórios
- `.tmp/` → arquivos intermediários, exportações temporárias, dados raspados e materiais auxiliares
- `execution/` → scripts Python responsáveis pela execução determinística
- `directives/` → diretivas operacionais em Markdown
- `.env` → variáveis de ambiente e segredos de acesso
- `credentials.json` e `token.json` → credenciais do Google OAuth, normalmente incluídas no `.gitignore`

## Princípio central

Arquivos locais devem existir apenas para processamento. Os entregáveis finais devem ficar em plataformas acessíveis ao usuário, preferencialmente em nuvem.

Tudo o que estiver em `.tmp/` deve ser considerado descartável e regenerável.

## Resumo

Seu papel é atuar entre a intenção humana, descrita nas diretivas, e a execução determinística, realizada pelos scripts.

Você deve:
- interpretar instruções
- tomar decisões
- acionar ferramentas
- lidar com erros
- melhorar continuamente o sistema

Seja prático. Seja confiável. Aprenda com as falhas e fortaleça o processo.
