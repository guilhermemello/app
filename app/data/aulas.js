const ENDPOINT = "http://localhost:4000/api/v1"

var actions = {
  getAulas(userId, categoriaId) {
    var url = ENDPOINT + '/aulas/' + '?user_id=' + userId + "&categoria_id=" + categoriaId;
    return fetch(url).then((res) => res.json()).then((res) => res.aulas);
  },

  getAula(userId, categoriaId, aulaId) {
    var url = ENDPOINT + '/aulas/' + aulaId + '?user_id=' + userId + "&categoria_id=" + categoriaId;
    return fetch(url).then((res) => res.json()).then((res) => res.aula);
  },

  marcarAulaComoAssistida(userId, categoriaId, aulaId) {
    var url = ENDPOINT + '/aulas/' + aulaId + '/marcar_como_assistida';

    var data = new FormData();
    data.append('user_id', userId);
    data.append('categoria_id', categoriaId);

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

export const API_AULAS = actions;
