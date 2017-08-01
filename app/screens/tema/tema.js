import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkCard
} from 'react-native-ui-kitten';

import {
  CommonList
} from '../../components';

import {FontAwesome} from '../../assets/icons';
import {API} from '../../data/api';

import HTMLView from 'react-native-htmlview';

export class Tema extends React.Component {
  static navigationOptions = {
    title: 'TEMA'
  };

  constructor(props) {
    super(props);

    this.state = {
      tema: {}
    }
  }

  componentDidMount() {
    let {params} = this.props.navigation.state;

    this.setState({ isLoading: false, tema: params.tema })
  }

  render() {
    const htmlContent = this.state.tema.descricao;

    return (
      <ScrollView style={styles.root}>
        <View style={styles.header}>
          <RkText rkType='s6'>
            {this.state.tema.titulo}
          </RkText>
        </View>
        <RkCard rkType='basic' style={styles.card}>
          <View rkCardContent>
            <View>
              <HTMLView
                value={htmlContent}
              />
            </View>
          </View>
        </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    padding: 10,
    alignItems: 'center'
  },
  card: {
    paddingTop: 10
  }
}));
