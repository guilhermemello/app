import React from 'react';
import {
  View,
  Image,
  Keyboard,
  Alert,
  AsyncStorage
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet
} from 'react-native-ui-kitten';

import {FontAwesome} from '../../assets/icons';
import {RkTheme} from 'react-native-ui-kitten';
import Spinner from 'react-native-loading-spinner-overlay';

import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import {AUTHENTICATION} from '../../data/authentication';

import _ from 'lodash';

export class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: false
    }
  }

  render() {
    let renderIcon = () => {
      return <Image source={require('../../assets/images/logo-home.png')}/>;
    };

    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <Spinner visible={this.state.isLoading} />
        <View style={styles.header}>
          {renderIcon()}
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='' placeholder='E-mail' onChangeText={(username) => this.setState({username})}/>
            <RkTextInput rkType='' placeholder='Senha' onChangeText={(password) => this.setState({password})} secureTextEntry={true}/>
            <RkButton rkType='stretch' style={{backgroundColor: '#EE7621'}} onPress={() => {
                this.authenticate();
              }}>
              Entrar
            </RkButton>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }

  authenticate() {
    this.setState({ isLoading: true });

    AUTHENTICATION.login(this.state.username, this.state.password).then(response => {
      if (response.status == 401) {
        Alert.alert(
          'Atenção',
          'O email ou senha inseridos são inválidos.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      } else {
        return response.json();
      }
    }).then(response => {
      AsyncStorage.setItem('current_user', JSON.stringify(response.user));

      this.setState({ isLoading: false });
      this.props.navigation.navigate('Home');
    });
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 20
  },
  content: {
    justifyContent: 'space-between',
    flex: 2,
    marginTop: -50
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    borderColor: theme.colors.border.solid
  }
}));
