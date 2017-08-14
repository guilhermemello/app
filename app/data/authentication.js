const ENDPOINT = "http://qcon-customer-jwt-srv-hmg.us-east-1.elasticbeanstalk.com/api/v1"

import {
  AsyncStorage
} from 'react-native';

var actions = {
  login(username, password) {
    var data = new FormData();
    data.append('user[username]', username);
    data.append('user[password]', password);

    const config = {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data;'
     },
     body: data,
    }

    return fetch(ENDPOINT + '/sign_in', config).then((res) => res);
  },

  logout() {
    AsyncStorage.removeItem('current_user');
  }
};

export const AUTHENTICATION = actions;
