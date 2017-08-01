const ENDPOINT = "http://localhost:4000/api/v1"

var actions = {
  getComentarios(trabalhoId) {
    var url = ENDPOINT + '/comentarios?trabalho_id=' + trabalhoId;
    return fetch(url).then((res) => res.json()).then((res) => res.comentarios);
  },

  criarComentario(trabalhoId, conteudo, user_id) {
    var url = ENDPOINT + '/comentarios';

    var data = new FormData();
    data.append('user_id', user_id);
    data.append('trabalho_id', trabalhoId);
    data.append('comentario[conteudo]', conteudo);

    console.log(JSON.stringify(data));

    const config = {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data;'
     },
     body: data,
    }

    return fetch(url, config).then((res) => res.json()).then((res) => res);
  }
};

export const API_COMENTARIOS = actions;
