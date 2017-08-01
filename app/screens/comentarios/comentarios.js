import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Keyboard,
  InteractionManager,
  Text
} from 'react-native';

import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

import HTMLView from 'react-native-htmlview'
import Spinner from 'react-native-loading-spinner-overlay';

import {Avatar} from '../../components/avatar';
import {FontAwesome} from '../../assets/icons';
import {API_COMENTARIOS} from '../../data/comentarios';
import {API_REDACAO} from '../../data/redacoes';

export class Comentarios extends React.Component {
  static navigationOptions = {
    title: 'COMENTÁRIOS'
  }

  constructor(props) {
    super(props);

    this.state = {
      mensagens: [],
      redacao: {},
      isLoading: true,
      isExecuting: false
    }
  }

  componentWillMount() {
    let {params} = this.props.navigation.state;

    API_COMENTARIOS.getComentarios(params.redacaoId).then(mensagens => {
      this.setState({ mensagens: mensagens });

      API_REDACAO.getRedacao(params.redacaoId).then(redacao => {
        this.setState({ isLoading: false, redacao: redacao })
      });
    });
  }

  enviarMensagem() {
    if (!this.state.message)
      return;

    let {params} = this.props.navigation.state;

    this.setState({ isExecuting: true });

    API_COMENTARIOS.criarComentario(params.redacaoId, this.state.message, 557).then(response => {
      this.setState({ message: '' });

      API_COMENTARIOS.getComentarios(params.redacaoId).then(mensagens => {
        this.setState({ mensagens: mensagens });

        API_REDACAO.getRedacao(params.redacaoId).then(redacao => {
          this.setState({ isExecuting: false, redacao: redacao })
          this.scroll(true);
        });
      });
    });
  }

  scroll() {
    if (Platform.OS === 'ios') {
      this.refs.list.scrollToEnd();
    } else {
      _.delay(() => this.refs.list.scrollToEnd(), 100);
    }
  }

  keyExtractor(comentario, index) {
    return comentario.id;
  }

  renderItem(info) {
    let professor = info.item.tipo === 2;
    let backgroundColor = professor
      ? RkTheme.current.colors.chat.messageInBackground
      : RkTheme.current.colors.chat.messageOutBackground;
    let itemStyle = professor ? styles.itemIn : styles.itemOut;

    let renderAvatar = (date) => (
      <Avatar style={styles.avatar} rkType='small' img={info.item.autor.professor_avatar_url}/>);

    return (
      <View style={[styles.item, itemStyle]}>
        <View style={{marginTop: 0}}>
          {professor && renderAvatar(info.item.date)}
        </View>
        <View style={[styles.balloon, {backgroundColor}]}>
          <HTMLView
            value={info.item.conteudo}
            stylesheet={styles}
          />
        </View>
      </View>
    )
  }

  renderAlertas() {
    if (this.state.redacao.total_duvidas_aluno == 0 && this.state.redacao.total_respostas_professor == 0) {
      return (
        <View style={styles.alert}>
          <RkText style={styles.alertText}>Envie o primeiro comentário e tire dúvidas sobre a sua redação diretamente com o professor.</RkText>
        </View>
      )
    } else if (this.state.redacao.total_duvidas_aluno == 1 && this.state.redacao.total_respostas_professor == 0) {
      return (
        <View style={styles.alert}>
          <RkText style={styles.alertText}>Para enviar a próxima dúvida, você precisa aguardar a resposta do professor.</RkText>
        </View>
      )
    } else if (this.state.redacao.total_duvidas_aluno == 2 && this.state.redacao.total_respostas_professor == 1) {
      return (
        <View style={styles.alert}>
          <RkText style={styles.alertText}>Já foram enviadas duas dúvidas para esta redação.</RkText>
        </View>
      )
    } else if (this.state.redacao.total_respostas_professor == 2) {
      return (
        <View style={styles.alert}>
          <RkText style={styles.alertText}>Não é mais possível enviar dúvidas para esta redação.</RkText>
        </View>
      )
    } else if (this.state.redacao.expirou_prazo_primeira_duvida || (this.state.redacao.total_comentarios > 0 && this.state.redacao.expirou_prazo_segunda_duvida)) {
      return (
        <View style={styles.alert}>
          <RkText style={styles.alertText}>Não é possível enviar uma nova dúvida para esta redação pois o prazo de dois dias foi atingido.</RkText>
        </View>
      )
    }
  }

  renderFooter() {
    let total_duvidas_aluno = this.state.redacao.total_duvidas_aluno;
    let total_respostas_professor = this.state.redacao.total_respostas_professor;

    if (!this.state.redacao.expirou_prazo_primeira_duvida) {
      if ((total_duvidas_aluno == 0) ||
          (total_duvidas_aluno == 1 && total_respostas_professor == 1)) {
        return (
          <View style={styles.footer}>
            <RkTextInput
              onFocus={() => this.scroll(true)}
              onBlur={() => this.scroll(true)}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
              rkType='row sticker'
              placeholder="Escreva seu comentário..."/>

            <RkButton onPress={() => this.enviarMensagem()} style={styles.send} rkType='circle highlight'>
              <Image source={require('../../assets/icons/sendIcon.png')}/>
            </RkButton>
          </View>
        )
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner visible={true} />
      )
    } else {
      return (
        <RkAvoidKeyboard style={styles.container} onResponderRelease={(event) => {
          Keyboard.dismiss();
        }}>
          <Spinner visible={this.state.isExecuting} />
          {this.renderAlertas()}
          <FlatList ref='list'
                    extraData={this.state}
                    style={styles.list}
                    data={this.state.mensagens}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}/>

          {this.renderFooter()}
        </RkAvoidKeyboard>
      )
    }
  }
}

let styles = RkStyleSheet.create(theme => ({
  header: {
    alignItems: 'center'
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  list: {
    paddingHorizontal: 17
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row'
  },
  itemIn: {},
  itemOut: {
    alignSelf: 'flex-end'
  },
  balloon: {
    maxWidth: 250,
    padding: 13,
    borderRadius: 20
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15
  },
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  alert: {
    padding: 10,
    backgroundColor: '#FFC1C1'
  },
  alertText: {
    fontSize: 13,
    marginHorizontal: 10
  }
}));
