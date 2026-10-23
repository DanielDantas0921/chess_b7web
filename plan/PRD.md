# PRD — Streamers de xadrez

## 1. Visão geral

Criar uma aplicação web em React para consultar e exibir streamers listados pela Chess.com. A interface apresenta os streamers em cards com avatar, nome de usuário, status de transmissão e um link para o canal na Twitch. A lista é dividida em páginas de 10 streamers.

## 2. Problema e objetivo

Encontrar rapidamente os canais de Twitch dos streamers de xadrez e identificar quais estão ao vivo, sem precisar consultar cada perfil individualmente.

**Objetivo do produto:** buscar os dados públicos da Chess.com e apresentá-los em uma lista visual, paginada e fácil de navegar.

## 3. Usuários e necessidade

**Usuário principal:** pessoa interessada em encontrar e assistir a streamers de xadrez.

**Necessidade:** visualizar quem está ao vivo e abrir o canal correspondente na Twitch.

## 4. Escopo

### Incluído

- Consultar `https://api.chess.com/pub/streamers`.
- Exibir os streamers retornados em cards.
- Mostrar avatar, username e status Online ou Offline.
- Disponibilizar um botão para acessar a Twitch de cada streamer.
- Paginar os resultados no cliente, mostrando 10 streamers por página.
- Manter em memória os dados recebidos para trocar de página sem refazer a requisição.
- Usar React com `useState` e `useEffect`; outros hooks precisam ser aprovados antes da implementação.

### Fora do escopo

- Pesquisa, filtros ou ordenação da lista.
- Autenticação, cadastro de usuários ou persistência dos dados entre sessões.
- Exibição de plataformas diferentes da Twitch.
- Atualização automática do status após o carregamento inicial.

## 5. Requisitos funcionais

### RF-01 — Carregar streamers

Ao abrir a aplicação, consultar o endpoint público da Chess.com e armazenar em memória a lista recebida.

### RF-02 — Exibir cards

Para cada streamer, apresentar:

- `username` como nome de usuário;
- `avatar` como imagem;
- `is_live` como status: `Online` quando verdadeiro e `Offline` quando falso;
- `twitch_url` como destino do botão de acesso à Twitch.

### RF-03 — Paginar resultados

- Exibir até 10 streamers por página.
- Apresentar controles de paginação abaixo da lista.
- Ao selecionar uma página, atualizar os cards exibidos sem buscar os dados novamente.
- Não permitir navegação para uma página anterior à primeira ou posterior à última.
- Se a lista tiver até 10 resultados, não há necessidade de exibir controles de paginação.

### RF-04 — Estados da consulta

- Enquanto os dados são carregados, informar que a lista está sendo carregada.
- Se a consulta falhar, apresentar uma mensagem clara de erro.
- Se a consulta retornar uma lista vazia, informar que não há streamers disponíveis.

## 6. Requisitos de interface e experiência

- O conteúdo do cabeçalho deve ficar dentro de um container com largura máxima, evitando que se estenda excessivamente em telas largas.
- Em telas largas, organizar os cards em duas colunas.
- Em cada card, posicionar as informações à esquerda e a foto/avatar à direita.
- Colocar a paginação abaixo dos cards.
- Identificar visualmente os estados Online e Offline e tornar os controles de paginação compreensíveis.
- O botão de acesso deve abrir o endereço fornecido em `twitch_url`.

## 7. Dados e integração

**Endpoint:** `GET https://api.chess.com/pub/streamers`

O endpoint retorna um objeto com a propriedade `streamers`, que contém uma lista de objetos. Os campos usados pelo produto são:

| Campo | Uso |
|---|---|
| `username` | Nome exibido no card |
| `avatar` | Imagem exibida no card |
| `twitch_url` | Destino do botão para abrir a Twitch |
| `is_live` | Determina o status Online ou Offline |

Os demais campos retornados, como `url`, `is_community_streamer` e `platforms`, não são necessários para a primeira versão.

## 8. Requisitos técnicos

- Implementar a interface em React.
- Usar somente `useState` e `useEffect` entre os hooks React. Caso outro hook seja necessário, solicitar autorização antes.
- Buscar os dados uma vez durante a montagem da interface e mantê-los em estado para a paginação.
- Calcular os itens da página atual a partir da lista armazenada.
- Tratar estados de carregamento, erro e lista vazia.

## 9. Critérios de aceite

1. A aplicação consulta o endpoint e usa os dados retornados para montar a lista.
2. Cada card mostra o username, o avatar e o status correspondente a `is_live`.
3. O botão de cada card abre a URL definida em `twitch_url`.
4. Com 11 ou mais streamers, a primeira página mostra no máximo 10 e a página seguinte mostra os próximos resultados.
5. Trocar de página não dispara uma nova consulta ao endpoint.
6. A paginação não permite acessar páginas fora do intervalo disponível.
7. Os estados de carregamento, erro e lista vazia são comunicados ao usuário.
8. Em telas largas, os cards são organizados em duas colunas e o cabeçalho respeita uma largura máxima.
9. A implementação utiliza apenas `useState` e `useEffect`, salvo autorização prévia para outro hook.

## 10. Regras complementares

1. Carregar a lista completa do endpoint e fazer a paginação no cliente.
2. Usar `twitch_url` como destino do botão para acessar a Twitch; esse campo estará presente nos resultados.
3. Se `twitch_url` estiver ausente inesperadamente, exibir o card sem botão/link de acesso e informar que o canal da Twitch não está disponível para aquele streamer.
