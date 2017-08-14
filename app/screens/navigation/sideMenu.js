import React from 'react';
import {
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {
  RkStyleSheet,
  RkText,
  RkTheme
} from 'react-native-ui-kitten';

import {OtherRoutes} from '../../config/navigation/routes';
import {FontAwesome} from '../../assets/icons';
import {AUTHENTICATION} from '../../data/authentication';
import {Avatar} from '../../components/avatar';

import _ from 'lodash';

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this._navigateAction = this._navigate.bind(this);

    this.state = {
      current_user: {}
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('current_user').then(current_user => {
      if (!_.isNil(current_user)) {
        this.setState({ current_user: JSON.parse(current_user) })
      }
    });
  }

  _navigate(route) {
    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: route.id})
      ]
    });
    this.props.navigation.dispatch(resetAction)
  }

  renderIcon() {
    return <Image style={styles.icon} source={require('../../assets/images/logo-mobile.png')}/>;
  }

  render() {
    let menu = OtherRoutes.map((route, index) => {
      return (
        <TouchableHighlight
          style={styles.container}
          key={route.id}
          underlayColor={RkTheme.current.colors.button.underlay}
          activeOpacity={1}
          onPress={() => this._navigateAction(route)}>
          <View style={styles.content}>
            <View style={styles.content}>
              <RkText style={styles.icon} rkType='awesome large'>{route.icon}</RkText>
              <RkText rkType='s6'>{route.title}</RkText>
            </View>
            <RkText rkType='awesome secondaryColor small'>{FontAwesome.chevronRight}</RkText>
          </View>
        </TouchableHighlight>
      )
    });

    menu.push(<TouchableHighlight
      style={styles.container}
      key='Sair'
      underlayColor={RkTheme.current.colors.button.underlay}
      activeOpacity={1}
      onPress={() => this.logout()}>
      <View style={styles.content}>
        <View style={styles.content}>
          <RkText style={styles.icon} rkType='awesome large'>{FontAwesome.signOut}</RkText>
          <RkText rkType='s6'>Sair</RkText>
        </View>
      </View>
    </TouchableHighlight>)

    return (
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.container, styles.content]}>
            <Avatar style={styles.avatar} rkType='small'
              img={'https://res.cloudinary.com/qconcursos/image/upload/t_perfil/v' + this.state.current_user.avatar_version + '/' + this.state.current_user.avatar_path } />
            <View style={{paddingHorizontal: 10}}>
              <RkText rkType='s6'>{this.state.current_user.name}</RkText>
              <RkText rkType='s9' style={{marginTop: 1}}>{this.state.current_user.email}</RkText>
            </View>
          </View>

          {menu}
        </ScrollView>
      </View>
    )
  }

  logout() {
    AUTHENTICATION.logout();
    this.props.navigation.navigate('Login');
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    height: 60,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base
  },
  root: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: theme.colors.screen.base
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 13
  }
}));
