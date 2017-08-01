import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkCard,
} from 'react-native-ui-kitten';

import {FontAwesome} from '../../assets/icons';
import {API_MODULOS} from '../../data/modulos';

import Spinner from 'react-native-loading-spinner-overlay';

export class Modulos extends React.Component {
  static navigationOptions = {
    title: 'MÓDULOS'
  };

  constructor(props) {
    super(props);

    this.state = {
      modulos: [],
      isLoading: true
    }
  }

  componentDidMount() {
    API_MODULOS.getModulos().then(modulos => {
      this.setState({ modulos: modulos, isLoading: false })
    });
  }

  statusModulo(modulo) {
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
  }

  renderModulos(modulo) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('ModulosDetalhe', { moduloId: modulo.id })}
        key={modulo.id}>
        <RkCard rkType='horizontal' style={styles.card}>
          <View rkCardHeader>
            <Text>{modulo.categoria.nome}</Text>

            <View style={styles.label}>
              {this.statusModulo(modulo)}
            </View>
          </View>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'></RkText>
            <RkText rkType='secondary6 hintColor' style={styles.hint}>Módulo com 4 redações</RkText>

            <View style={styles.section}>
              <RkText rkType='awesome primary small'>{FontAwesome.chevronRight}</RkText>
            </View>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner visible={this.state.isLoading} />
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.statItems}>
            {this.state.modulos.map(modulo => this.renderModulos(modulo))}
          </View>
        </ScrollView>
      )
    }
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  card: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  time: {
    marginTop: 5
  },
  hint: {
    marginTop: 5
  },
  section: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
    marginVertical: -15
  },
  headerText: {
    fontSize: 15
  },
  navBar: {
    backgroundColor: 'transparent',
  },
  label: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
}));
