import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkCard,
} from 'react-native-ui-kitten';

import {FontAwesome} from '../../assets/icons';
import {MODULOS_API} from '../../data/modulos';
import {MODULOS_HELPER} from '../../helpers/modulos';

import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';

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

  // componentWillMount() {
  //   AsyncStorage.getItem('current_user').then(current_user => {
  //     if (_.isNil(current_user)) {
  //       this.props.navigation.navigate('Login');
  //       this.setState({ isLoading: false })
  //     }
  //   });
  // }

  componentDidMount() {
    MODULOS_API.getModulos().then(modulos => {
      this.setState({ modulos: modulos, isLoading: false })
    });
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
              {MODULOS_HELPER.status(modulo)}
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
