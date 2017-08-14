import React from 'react';

import {
  RkText
} from 'react-native-ui-kitten';

var actions = {
  status(modulo) {
    var label = null;

    switch (modulo.status.id) {
      case 1:
        label = <RkText rkType='label-orange s8'>{modulo.status.nome}</RkText>
        break;
      case 2:
        label = <RkText rkType='label-blue s8'>{modulo.status.nome}</RkText>
        break;
      case 3:
        label = <RkText rkType='label-green s8'>{modulo.status.nome}</RkText>
        break;
      case 4:
        label = <RkText rkType='label-red s8'>{modulo.status.nome}</RkText>
        break;
      case 5:
        label = <RkText rkType='label-red s8'>{modulo.status.nome}</RkText>
        break;
      case 6:
        label = <RkText rkType='label-red s8'>{modulo.status.nome}</RkText>
        break;
    }

    return label;
  },

  title(tipo) {
    switch (tipo) {
      case 4:
        return "Módulo com 4 redações"
      case 8:
        return "Módulo com 8 redações"
      case 12:
        return "Módulo com 12 redações"
    }
  }
};

export const MODULOS_HELPER = actions;
