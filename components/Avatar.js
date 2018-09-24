import React from 'react';
import PropTypes from 'prop-types'
import Colors from '../constants/Colors';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Layout from '../constants/Layout';
import Helpers from '../utilities/Helpers';

export default class Avatar extends React.Component {  
  static propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 36,
  }

  render() {
    let { user, size } = this.props
    return (
      <View style={[
        styles.avatarWrapper,
        {
          width: size, 
          height: size,
          borderRadius: size/2,
        }
      ]}>
        <View style={[
          styles.avatarWrapperInner, 
          {
            backgroundColor: user.color,
            width: (size-2), 
            height: (size-2),
            borderRadius: (size-2)/2,
          }
        ]}>
          <Text style={[
            styles.text, 
            styles.avatar,
            {fontSize: (size-16)},
          ]}>
            {user.name[0].toUpperCase()}
            {/*user.avatar*/}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarWrapper: {
    borderWidth: 2,
    borderColor: Colors.rose,
    marginRight: Layout.smallPadding + Layout.tinyPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapperInner: {
    borderWidth: 2,
    borderColor: Colors.transparent,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    textAlign: 'center',
    // borderWidth: 1, borderColor: 'black',
    // marginTop: -5,
    // marginLeft: -3,
    marginLeft: 1,
    marginTop: -1,
  },
});