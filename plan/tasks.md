# Tasks — Streamers de xadrez

## 1. Estruturar a aplicação

- [x] Conferir a estrutura existente do projeto e identificar os pontos de entrada da aplicação.
- [x] Preparar a página principal para apresentar a lista de streamers, preservando os padrões já usados no projeto.
- [x] Limitar a largura do conteúdo do cabeçalho com um container responsivo.

## 2. Consultar e armazenar os streamers

- [x] Implementar a consulta `GET https://api.chess.com/pub/streamers` ao carregar a página.
- [x] Armazenar em estado os dados recebidos para que a navegação entre páginas não faça novas consultas.
- [x] Tratar os estados de carregamento, erro na consulta e lista vazia com mensagens visíveis.
- [x] Usar somente `useState` e `useEffect` como hooks React; solicitar autorização antes de introduzir outro hook.

## 3. Implementar os cards

- [x] Criar um card para cada streamer com `username`, `avatar` e status derivado de `is_live`.
- [x] Exibir `Online` quando `is_live` for verdadeiro e `Offline` quando for falso.
- [x] Exibir um botão que abra `twitch_url` para acessar o canal.
- [x] Se `twitch_url` estiver ausente, procurar em `platforms` a entrada com `type: "twitch"` e usar `channel_url`; se necessário, usar `stream_url`.
- [x] Se não houver URL de Twitch disponível, manter o card sem botão/link e informar que o canal não está disponível.
- [x] Organizar as informações à esquerda e o avatar à direita em cada card.

## 4. Implementar paginação no cliente

- [x] Exibir no máximo 10 streamers por página, usando a lista já armazenada.
- [x] Adicionar controles de paginação abaixo dos cards quando houver mais de 10 resultados.
- [x] Fazer os controles exibirem a página selecionada e atualizarem os cards sem uma nova consulta à API.
- [x] Impedir a navegação para páginas anteriores à primeira ou posteriores à última.

## 5. Aplicar o layout responsivo

- [x] Organizar os cards em duas colunas em telas largas.
- [x] Garantir que a lista e os controles de paginação permaneçam utilizáveis em telas menores.
- [x] Diferenciar visualmente os status Online e Offline e identificar claramente os controles de paginação.

## 6. Validar a implementação

- [x] Confirmar que cada card mostra os dados correspondentes ao streamer retornado pela API.
- [x] Confirmar que `twitch_url` é usado como destino principal e que os fallbacks definidos funcionam.
- [x] Confirmar que 11 ou mais resultados são distribuídos em páginas de até 10 itens.
- [x] Confirmar que mudar de página não dispara outra consulta ao endpoint.
- [x] Confirmar os comportamentos de carregamento, erro, lista vazia e limites de paginação.
- [x] Executar os testes, lint e/ou build disponíveis no projeto e corrigir falhas relacionadas à implementação.
