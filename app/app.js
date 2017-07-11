import React from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import {withRkTheme} from 'react-native-ui-kitten';
import {AppRoutes} from '../config/navigation/routesBuilder';
import * as Screens from './screens';
import {bootstrap} from '../config/bootstrap';
// import track from './config/analytics';
// import {data} from './data'

bootstrap();

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
const RedacaoPerfeita = StackNavigator({
  First: {
    screen: Screens.SplashScreen
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
  headerMode: 'none',
});


export default () => (
  <RedacaoPerfeita
    onNavigationStateChange={(prevState, currentState) => {
      const currentScreen = getCurrentRouteName(currentState);
      const prevScreen = getCurrentRouteName(prevState);

      if (prevScreen !== currentScreen) {
        track(currentScreen);
      }
    }}
  />
);