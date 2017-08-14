import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  ImageBackground
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkButton
} from 'react-native-ui-kitten';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import {FontAwesome} from '../../assets/icons';
import {API_AULAS} from '../../data/aulas';
import {VIMEO} from '../../data/vimeo';
import _ from 'lodash';

const {width, height} = Dimensions.get('window')

import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

export class AulasDetalhe extends React.Component {
  static navigationOptions = {
    title: 'AULA'
  }

  constructor(props) {
    super(props);

    this.state = {
      aula: {},
      vimeo: {},
      isLoading: true,
      isExecuting: false
    }
  }

  async componentWillMount() {
    let {params} = this.props.navigation.state;

    API_AULAS.getAula(557, params.aula.categoria_id, params.aula.id).then(aula => {
      this.setState({ isLoading: true, aula: aula })

      VIMEO.get(this.state.aula.vimeo_id).then(vimeo => {
        this.setState({ isLoading: false, vimeo: vimeo })
      });
    }).done();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner visible={this.state.isLoading} />
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Spinner visible={this.state.isExecuting} />

          <View style={styles.container}>
            <TouchableOpacity
              delayPressIn={70}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('Player', { url: this.videoUrl(this.state.vimeo) })}>
              <View>
                <ImageBackground
                  style={styles.thumbnail}
                  source={{ uri: this.renderThumbnail(this.state.vimeo) }}>
                  <View style={styles.buttonPlay}>
                    <TouchableWithoutFeedback
                      onPress={() => this.props.navigation.navigate('Player', { url: this.videoUrl(this.state.vimeo) })}>
                      <View>
                        <Icon
                          style={styles.iconPlay}
                          name="play-circle"
                          size={90}
                          color="white"
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>

            <View style={styles.headerContainer}>
              <View style={styles.headerText}>
                <RkText rkType='s3'>{this.state.aula.nome}</RkText>
                <RkText rkType='s4 hintColor' style={styles.hint}>{this.state.aula.professor.nome}</RkText>
              </View>
            </View>
          </View>

          {this.renderButton()}
        </View>
      )
    }
  }

  renderButton() {
    if (this.state.aula.situacao == 2) {
      return (
        <View style={styles.subHeaderContainer}>
          <RkButton rkType='default' style={styles.button} onPress={() => this.marcarAulaComoAssistida()}>
            Marcar como assistida  <RkText rkType='awesome small' style={{color: 'white'}}>{FontAwesome.check}</RkText>
          </RkButton>
        </View>
      )
    }
  }

  videoUrl(response) {
    return _(response.download)
      .find({ quality: 'mobile' })
      .link;
  }

  renderThumbnail(response) {
    return _(response.pictures.sizes)
      .find({ width: 640 })
      .link;
  }

  marcarAulaComoAssistida() {
    this.setState({ isExecuting: true });

    API_AULAS.marcarAulaComoAssistida(557, this.state.aula.categoria_id, this.state.aula.aula_id).then(response => {
      this.setState({ isExecuting: false });
      this.props.navigation.navigate('AulasDetalhe', { aula: response.aula })
    });
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: '#F2F2F2'
  },
  thumbnail: {
    height: 200
  },
  buttonPlay: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  iconPlay: {
    opacity: 0.9,
    backgroundColor: 'transparent'
  },
  headerContainer: {
    padding: 10
  },
  hint: {
    marginTop: 5
  },
  subHeaderContainer: {
    position:'absolute',
    bottom: 0
  },
  button: {
    width: width,
    borderRadius: 0,
    borderWidth: 0
  }
}));
