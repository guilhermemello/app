const ENDPOINT = "http://localhost:4000/api/v1"

var actions = {
  getRedacoes(moduloId) {
    var url = ENDPOINT + '/trabalhos/' + moduloId + '/por_modulo';
    return fetch(url).then((res) => res.json()).then((res) => res.trabalhos);
  },

  getRedacao(redacaoId) {
    var url = ENDPOINT + '/trabalhos/' + redacaoId;
    return fetch(url).then((res) => res.json()).then((res) => res.trabalho);
  },
};

export const API_REDACAO = actions;
