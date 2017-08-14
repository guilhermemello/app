import React from 'react';
import {
  View,
  Image,
} from 'react-native';

import {
  RkStyleSheet
} from 'react-native-ui-kitten';

import VideoPlayer from 'react-native-video-controls';

export class Player extends React.Component {
  static navigationOptions = {
    header: null
  }

  back() {
    const {goBack} = this.props.navigation
    goBack()
  }

  render() {
    let {params} = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <VideoPlayer
          source={{ uri: params.url }}
          onBack={() => this.back()}
        />
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1
  }
}));
