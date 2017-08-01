const ENDPOINT = "https://api.vimeo.com/videos"
const VIMEO_ACCES_TOKEN = "11b6405c069e1cef5a4b510c9e1e3996"

var actions = {
  get(videoId) {
    var url = ENDPOINT + '/' + videoId + '?access_token=' + VIMEO_ACCES_TOKEN
    return fetch(url).then((res) => res.json()).then((res) => res);
  }
};

export const VIMEO = actions;
