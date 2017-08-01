const ENDPOINT = "http://localhost:4000/api/v1"

var actions = {
  upload(path, moduloId) {
    var data = new FormData();
    data.append('trabalho[redacao_enviada]', { uri: path, name: 'redacao.jpg', type: 'image/jpg' });
    data.append('trabalho[modulo_id]', moduloId);

    const config = {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data;'
     },
     body: data,
    }

    return fetch(ENDPOINT + '/trabalhos', config).then((res) => res.json()).then((res) => res);
   }
};

export const CAMERA = actions;
