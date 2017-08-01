import React from 'react';
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';

import {
  CommonList
} from '../../components';

import Spinner from 'react-native-loading-spinner-overlay';

import {FontAwesome} from '../../assets/icons';
import {API_AULAS} from '../../data/aulas';

export class Aulas extends React.Component {
  static navigationOptions = {
    title: 'AULAS'
  };

  constructor(props) {
    super(props);

    this.state = {
      aulas: {},
      isLoading: true
    }
  }

  componentWillMount() {
    let {params} = this.props.navigation.state;

    API_AULAS.getAulas(557, params.categoriaId).then(aulas => {
      this.setState({ isLoading: false, aulas: aulas })
    });
  }

  renderAulas(aula) {
    switch (aula.situacao) {
      case 1:
        return (
          <View key={aula.id}>
            <CommonList text={aula.nome} icon={FontAwesome.lock} />
          </View>
        )
        break;
      case 2:
        return (
          <View key={aula.id}>
            <CommonList text={aula.nome} icon={FontAwesome.play} onPress={() => this.props.navigation.navigate('AulasDetalhe', { aula: aula })} />
          </View>
        )
        break;
      case 3:
        return (
          <View key={aula.id}>
            <CommonList text={aula.nome} icon={FontAwesome.check} onPress={() => this.props.navigation.navigate('AulasDetalhe', { aula: aula })} />
          </View>
        )
        break;
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
      <Spinner visible={this.state.isLoading} />
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          {this.state.aulas.map(aula => this.renderAulas(aula))}
        </ScrollView>
      )
    }
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 0,
  },
  statItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  statItemIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'white',
  },
  statItemValue: {
    color: 'white',
  },
  statItemName: {
    color: 'white',
  },
  chartBlock: {
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },
}));
