import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';

import {withRkTheme} from 'react-native-ui-kitten';
import {AppRoutes} from './config/navigation/routesBuilder';
import * as Screens from './screens';
import {bootstrap} from './config/bootstrap';

import _ from 'lodash';

import Reactotron from 'reactotron-react-native'

bootstrap();

Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

let SideMenu = withRkTheme(Screens.SideMenu);

const NavDeslogado = StackNavigator({
  Login: {
    screen: Screens.Login
  },
  Home: {
    screen: DrawerNavigator({
        ...AppRoutes,
      },
      {
        contentComponent: (props) => <SideMenu {...props}/>
      })
  }
}, {
  headerMode: 'none'
});

const NavLogado = StackNavigator({
  Home: {
    screen: DrawerNavigator({
        ...AppRoutes,
      },
      {
        contentComponent: (props) => <SideMenu {...props}/>
      })
  },
  Login: {
    screen: Screens.Login
  },
}, {
  headerMode: 'none'
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tipo: "",
      loading: true
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('current_user').then(current_user => {
      if (_.isNil(current_user)) {
        this.setState({ tipo: 'deslogado' });
      } else {
        this.setState({ tipo: 'logado' });
      }

      this.setState({ loading: false })
    });
  }

  render() {
    if (this.state.loading == false) {
      if (this.state.tipo == "logado") {
        return (<NavLogado
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);
          }}
        />)
      } else {
        return (<NavDeslogado
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);
          }}
        />)
      }
    } else {
      return null
    }
  }
}
