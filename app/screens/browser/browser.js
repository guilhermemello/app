import React from 'react';
import {
  WebView
} from 'react-native';

export class Browser extends React.Component {
  static navigationOptions = {
    title: 'Redação'
  };

  render() {
    let {params} = this.props.navigation.state;

    return (
      <WebView
        source={{uri: params.url}}
        style={{marginTop: -10}}
      />
    );
  }
}
