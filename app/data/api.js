// const ENDPOINT = "http://localhost:4000/api/v1"
//
// var actions = {
//   getModulos() {
//     var url = ENDPOINT + '/modulos?aluno_id=557';
//     return fetch(url).then((res) => res.json()).then((res) => res.modulos);
//   },
//
//   getModulo(moduloId) {
//     var url = ENDPOINT + '/modulos/' + moduloId;
//     return fetch(url).then((res) => res.json()).then((res) => res.modulo);
//   },
//
//   getRedacoes(moduloId) {
//     var url = ENDPOINT + '/trabalhos/' + moduloId + '/por_modulo';
//     return fetch(url).then((res) => res.json()).then((res) => res.trabalhos);
//   },
//
//   getRedacao(redacaoId) {
//     var url = ENDPOINT + '/trabalhos/' + redacaoId;
//     return fetch(url).then((res) => res.json()).then((res) => res.trabalho);
//   },
//
//   getAulas(userId, categoriaId) {
//     var url = ENDPOINT + '/aulas/' + '?user_id=' + userId + "&categoria_id=" + categoriaId;
//     return fetch(url).then((res) => res.json()).then((res) => res.aulas);
//   },
//
//   getAula(userId, categoriaId, aulaId) {
//     var url = ENDPOINT + '/aulas/' + aulaId + '?user_id=' + userId + "&categoria_id=" + categoriaId;
//     return fetch(url).then((res) => res.json()).then((res) => res.aula);
//   },
//
//   marcarAulaComoAssistida(userId, categoriaId, aulaId) {
//     var url = ENDPOINT + '/aulas/' + aulaId + '/marcar_como_assistida';
//
//     var data = new FormData();
//     data.append('user_id', userId);
//     data.append('categoria_id', categoriaId);
//
//     const config = {
//      method: 'POST',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'multipart/form-data;'
//      },
//      body: data,
//     }
//
//     return fetch(url, config).then((res) => res.json()).then((res) => res);
//   },
//
//   getComentarios(trabalhoId) {
//     var url = ENDPOINT + '/comentarios?trabalho_id=' + trabalhoId;
//     return fetch(url).then((res) => res.json()).then((res) => res.comentarios);
//   },
//
//   criarComentario(trabalhoId, conteudo, user_id) {
//     var url = ENDPOINT + '/comentarios';
//
//     var data = new FormData();
//     data.append('user_id', user_id);
//     data.append('trabalho_id', trabalhoId);
//     data.append('comentario[conteudo]', conteudo);
//
//     console.log(JSON.stringify(data));
//
//     const config = {
//      method: 'POST',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'multipart/form-data;'
//      },
//      body: data,
//     }
//
//     return fetch(url, config).then((res) => res.json()).then((res) => res);
//   },
// };
//
// export const API = actions;
