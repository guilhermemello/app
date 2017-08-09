import React from 'react';
import {
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet
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

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this._navigateAction = this._navigate.bind(this);
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
              <RkText>{route.title}</RkText>
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
          <RkText>Sair</RkText>
        </View>
      </View>
    </TouchableHighlight>)

    return (
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.container, styles.content]}>
            {this.renderIcon()}
            <RkText rkType='logo'>Redação Perfeita</RkText>
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
    height: 80,
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
    marginRight: 13,
  }
}));
