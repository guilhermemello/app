import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkCard,
  RkButton
} from 'react-native-ui-kitten';

import {
  CommonList
} from '../../components';

import Spinner from 'react-native-loading-spinner-overlay';

import {FontAwesome} from '../../assets/icons';
import {API_REDACAO} from '../../data/redacoes';

export class Redacoes extends React.Component {
  static navigationOptions = {
    title: 'REDAÇÕES'
  };

  constructor(props) {
    super(props);

    this.state = {
      redacoes: [],
      isLoading: true
    }
  }

  componentDidMount() {
    let {params} = this.props.navigation.state;

    API_REDACAO.getRedacoes(params.moduloId).then(redacoes => {
      this.setState({ isLoading: false, redacoes: redacoes })
    });
  }

  renderRedacoes(redacao) {
    return (
      <View key={redacao.id}>
        <CommonList text={redacao.tema.titulo} icon={FontAwesome.paperText} onPress={() => this.props.navigation.navigate('RedacaoDetalhe', { redacaoId: redacao.id })} />
      </View>
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
          {this.state.redacoes.map(redacao => this.renderRedacoes(redacao))}
        </ScrollView>
      )
    }
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
}));
