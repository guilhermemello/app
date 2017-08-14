import { ENDPOINT } from 'react-native-dotenv'

var actions = {
  getModulos() {
    var url = ENDPOINT + '/modulos?aluno_id=557';
    return fetch(url).then((res) => res.json()).then((res) => res.modulos);
  },

  getModulo(moduloId) {
    var url = ENDPOINT + '/modulos/' + moduloId;
    return fetch(url).then((res) => res.json()).then((res) => res.modulo);
  }
};

export const MODULOS_API = actions;
