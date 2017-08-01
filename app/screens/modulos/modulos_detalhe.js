import React from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
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

import { Col, Row, Grid } from "react-native-easy-grid";
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FontAwesome} from '../../assets/icons';
import {API_MODULOS} from '../../data/modulos';
import {CAMERA} from '../../data/camera';

export class ModulosDetalhe extends React.Component {
  static navigationOptions = {
    title: 'ENEM'
  };

  constructor(props) {
    super(props);

    this.state = {
      modulo: {},
      isLoading: true
    }
  }

  componentWillMount() {
    let {params} = this.props.navigation.state;

    API_MODULOS.getModulo(params.moduloId).then(modulo => {
      this.setState({ isLoading: false, modulo: modulo })
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
          <View style={styles.header}>
            <View style={styles.hint}>
            <RkText rkType='h5 bold'>Módulo com 4 redações</RkText>
            </View>

            <View style={styles.subHeader}>
              <RkText rkType='awesome small s8'>{FontAwesome.check} Iniciou em {this.state.modulo.inicia_em}</RkText>
              <RkText rkType='awesome small s8'>{FontAwesome.lock} Encerra em {this.state.modulo.expira_em}</RkText>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Grid>
              <Row>
                <Col>
                  <Text style={styles.cardDescription}>
                    TEMA DA SEMANA
                  </Text>
                </Col>
                <Col style={styles.sendLimitContainer}>
                  <RkText type="bold" style={styles.sendLimit}>
                    Envio até {this.state.modulo.tema.expira_em}
                  </RkText>
                </Col>
              </Row>
            </Grid>

            <TouchableOpacity style={styles.temaContainer} onPress={() => this.props.navigation.navigate('Tema', { tema: this.state.modulo.tema })}>
              <View style={styles.temaTitulo}>
                <RkText rkType='default p4' style={styles.temaTituloText}>{this.state.modulo.tema.titulo}</RkText>
              </View>
              <View style={styles.temaChev}>
                <RkText rkType='awesome small' style={styles.chevColor}>{FontAwesome.chevronRight}</RkText>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionDescription}>
              MENU
            </Text>

            <CommonList text='Redações' icon={FontAwesome.papers} onPress={() => this.props.navigation.navigate('Redacoes', { moduloId: this.state.modulo.id })} />
            <CommonList text='Aulas' icon={FontAwesome.video} onPress={() => this.props.navigation.navigate('Aulas', { categoriaId: this.state.modulo.categoria.id })} />
          </View>

          {this.renderActionButton()}
        </ScrollView>
      )
    }
  }

  renderActionButton() {
    if (!this.state.modulo.redacao_enviada_para_tema) {
      return (
        <View>
          <ActionButton
            buttonColor="#EE7621"
            onPress={() => { this.selectPhoto() }}
            icon={<Icon name="paper-plane-o" size={20} color="white" />}
          />
        </View>
      )
    }
  }

  selectPhoto() {
    const options = {
      title: 'Selecione a redação',
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (!response.didCancel && response.error) {
        CAMERA.upload(response.uri, this.state.modulo.id).then(response => {
          console.log(response);

          Alert.alert(
            'Atenção',
            'Redação enviada com sucesso.',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('RedacaoDetalhe', { redacaoId: response.trabalho.id }) }],
            { cancelable: false }
          )
        });
      }
    });
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll
  },

  /* CARD */
  card: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    backgroundColor: theme.colors.screen.background
  },
  cardContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  cardDescription: {
    paddingVertical: 10,
    color: theme.colors.cinza
  },
  sendLimitContainer: {
    alignItems: 'flex-end',
    marginTop: 10
  },
  sendLimit: {
    color: '#A62A2A',
    fontSize: 12
  },
  cardBody: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: -25
  },
  cardText: {
    flexDirection: 'column'
  },


  temaContainer: {
    backgroundColor: theme.colors.screen.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  temaTitulo: {
    width: 300,
  },
  temaTituloText: {
    lineHeight: 20
  },

  temaChev: {
    justifyContent:'center'
  },

  commonList: {
    backgroundColor: theme.colors.screen.white
  },

  section: {
    marginVertical: 5
  },
  sectionDescription: {
    color: theme.colors.cinza,
    paddingVertical: 10,
    paddingHorizontal: 15
  },

  heading: {
    paddingBottom: 12.5,
    color: theme.colors.cinza
  },
  row: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    // alignItems: 'center'
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  header: {
    backgroundColor: theme.colors.screen.background,
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  hint: {
    paddingVertical: 8,
    alignItems: 'center'
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  chevColor: {
    color: '#EBEEEF'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
}));
