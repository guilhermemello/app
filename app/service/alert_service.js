import React from 'react';
import {
  Alert,
} from 'react-native';

var alerts = {
  display(title, msg, teste) {
    Alert.alert(
      title,
      msg,
      [ { text: 'OK', onPress: () => teste } ],
      { cancelable: false }
    )
   }
};

export const ALERT_SERVICE = alerts;
