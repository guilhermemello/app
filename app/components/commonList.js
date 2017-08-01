import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  RkText,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {FontAwesome} from '../assets/icons';

export class CommonList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={[styles.wrapper, this.props.style]} onPress={this.props.onPress}>
        <View style={styles.row}>
          <View style={styles.text}>
            <RkText rkType='awesome' style={styles.icon}>{this.props.icon}</RkText>
            <RkText rkType='default p4' style={styles.textItem}>{this.props.text}</RkText>
          </View>
          <RkText rkType='awesome small' style={styles.chevColor}>{FontAwesome.chevronRight}</RkText>
        </View>
      </TouchableOpacity>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  wrapper: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 17.5,
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    borderTopWidth: 2
  },
  text: {
    flexDirection: 'row'
  },
  textItem: {
    width: 280
  },
  icon: {
    width: 35,
    color: '#F26522'
  },
  chevColor: {
    color: '#EBEEEF'
  }
}));
