#Projeto
O projeto será para listar streamers do site chess e mostrar vários cards com um botão para acessar a twitch de cada streamer

#Visual ( Ui/Ux)

O projeto tera um container no cabeçalho com um max width para não ficar muito grande.
Em baixo terá linhas com 2 cards um ao lado do outro. 

Cada card terá uma foto a direita, e nolado esquerdo vai ter o username, um texto se vai estar Online ou Offline e um botão para acessar a twitch.
em baixo de todos os 10 cards terá os botões de paginação que vai ser de 10 em 10 streamers

#Detalhes técnicos

O site acessará uma api com endpoint https://api.chess.com/pub/streamers para buscar os streamers e montar os cards. No card será: username para o campo de username, avatar para avatar, twitch url para link do botão para acessar twitch e is_live para decidir se vai mostrar Online ou Offline.
Deverá ser armazenado os dados da requisição e fazer uma paginação de 10 em 10 streamers a medida que que muda os botões em baixo de paginação

Use React apenas com useState e useEffect. Se precisar de outro hook me avise antes.


{
  "streamers": [
    {
      "username": "HighVarianceYT",
      "avatar": "https://images.chesscomfiles.com/uploads/v1/user/87207468.58a6496b.50x50o.fad7893dda6f.jpeg",
      "twitch_url": "https://twitch.tv/highvariancetv",
      "url": "https://www.chess.com/member/HighVarianceYT",
      "is_live": true,
      "is_community_streamer": false,
      "platforms": [
        {
          "type": "twitch",
          "stream_url": "https://twitch.tv/highvariancetv",
          "channel_url": "https://twitch.tv/highvariancetv",
          "is_live": true,
          "is_main_live_platform": true
        },
        {
          "type": "youtube",
          "stream_url": "https://www.youtube.com/watch?v=tG-kQvewf80",
          "channel_url": "https://youtube.com/@highvarianceyt",
          "is_live": true,
          "is_main_live_platform": false
        }
      ]
    },