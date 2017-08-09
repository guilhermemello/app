import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

import {
  CommonList
} from '../../components';

import {Avatar} from '../../components/avatar';
import {FontAwesome} from '../../assets/icons';
import {API_REDACAO} from '../../data/redacoes';

export class RedacaoDetalhe extends React.Component {
  static navigationOptions = {
    title: 'REDAÇÃO'
  };

  constructor(props) {
    super(props);

    this.state = {
      redacao: {},
      isLoading: true
    }
  }

  componentWillMount() {
    let {params} = this.props.navigation.state;

    API_REDACAO.getRedacao(params.redacaoId).then(redacao => {
      this.setState({ isLoading: false, redacao: redacao })
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <View style={styles.headerContainer}>
              <RkText rkType="h4">
                {this.state.redacao.modulo.tema.titulo}
              </RkText>
            </View>

            {this.renderHeader()}
          </View>

          <Text style={styles.sectionDescription}>
            DETALHES
          </Text>
          {this.renderList()}
        </ScrollView>
      )
    }
  }

  renderHeader() {
    if (this.state.redacao.enviada && !this.state.redacao.corrigida) {
      return (
        <View style={styles.subHeaderContainer}>
          <RkText rkType="s7 awesome" style={styles.subHeaderText}>
            {FontAwesome.send}  Enviada em {this.state.redacao.entregue_em}
          </RkText>
          <RkText rkType="s7 awesome" style={styles.subHeaderText}>
            {FontAwesome.clock} Prazo para correção {this.state.redacao.prazo_correcao}
          </RkText>
        </View>
      )
    } else {
      return (
        <View>
          <View style={styles.subHeaderContainer}>
            <RkText rkType="s7 awesome" style={styles.subHeaderText}>
              {FontAwesome.send}  Enviada em {this.state.redacao.entregue_em}
            </RkText>
            <RkText rkType="s7 awesome" style={styles.subHeaderText}>
              {FontAwesome.pencil}  Corrigida em {this.state.redacao.corrigido_em}
            </RkText>
          </View>

          <View style={styles.professorContainer}>
            <View>
              <Avatar style={styles.avatar} rkType='small' img={this.state.redacao.professor.avatar_path} />
            </View>
            <View style={styles.professorText}>
              <RkText rkType="s6 ">Professor</RkText>
              <RkText rkType="s7 light">{this.state.redacao.professor.nome}</RkText>
            </View>
          </View>
        </View>
      )
    }
  }

  renderList() {
    if (this.state.redacao.enviada && !this.state.redacao.corrigida) {
      return (
        <View>
          <CommonList text='Redação' icon={FontAwesome.paper} onPress={() => this.props.navigation.navigate('Browser', { url: this.state.redacao.enviada_url })} />
        </View>
      )
    } else {
      return (
        <View>
          <CommonList text='Redação' icon={FontAwesome.paper} onPress={() => this.props.navigation.navigate('Browser', { url: this.state.redacao.enviada_url })} />
          <CommonList text='Correção' icon={FontAwesome.paperText} onPress={() => this.props.navigation.navigate('Browser', { url: this.state.redacao.corrigida_url })} />
          <CommonList text='Comentários' icon={FontAwesome.chat} onPress={() => this.props.navigation.navigate('Comentarios', { redacaoId: this.state.redacao.id })} />
        </View>
      )
    }
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: '#F5F7F7'
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  statusContainer: {
    flex: 1
  },
  subHeaderContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  subHeaderText: {
    marginBottom: 25
  },
  professorContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'center'
  },
  professorText: {
    justifyContent: 'center',
    padding: 10
  },
  avatar: {
    marginVertical: 10
  },
  sectionDescription: {
    color: theme.colors.cinza,
    paddingVertical: 10,
    paddingHorizontal: 15
  }
}));
