import React from 'react';
import PropTypes from 'prop-types'
import Colors from '../constants/Colors';
import { Text, Animated, Easing, View, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default class FloatingIcon extends React.Component {
  constructor(props) {
    super(props);
    let rotPerc = Math.random() * (Math.random() > 0.5 ? -1 : 1)
    let icons = ['heart','heart','heart','heart','emoji','emoji','follower']
    let emojis = ['👍','😍','🙌','👌']

    this.state = {
      saved: false,
      direction: 360 * Math.random(),
      elevationAnim: new Animated.Value(0),
      scaleAnim: new Animated.Value(0.01),
      opacityAnim: new Animated.Value(1),
      rotPerc: new Animated.Value(rotPerc),
      invertedRotPerc: new Animated.Value(rotPerc*-1),
      icon: icons[Math.floor(Math.random()*icons.length)],
      emoji: emojis[Math.floor(Math.random()*emojis.length)],
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.state.scaleAnim.setValue(0.3)
      this.beginAnimation()
    }, Math.random() * 1500)
  }

  beginAnimation = () => {
    Animated.timing(this.state.scaleAnim, {
      toValue: 1,
      duration: 700,
    }).start()
    Animated.timing(this.state.elevationAnim, {
      toValue: 500,
      duration: 2000,
      easing: Easing.bezier(0,.2,1,0),
    }).start()
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: 2000,
      easing: Easing.bezier(0,0,1,0),
    }).start()
    Animated.timing(this.state.rotPerc, {
      toValue: 0,
      duration: 2750,
    }).start()
    Animated.timing(this.state.invertedRotPerc, {
      toValue: 0,
      duration: 2750,
    }).start()
  }

  render() {
    let { 
      elevationAnim,
      scaleAnim,
      opacityAnim,
      rotPerc,
      invertedRotPerc,
    } = this.state

    let rotation = rotPerc.interpolate({
      inputRange: [-1, 1],
      outputRange: ['-135deg', '135deg'],
    })

    let invertedRotation = invertedRotPerc.interpolate({
      inputRange: [-1, 1],
      outputRange: ['-135deg', '135deg'],
    })

    return (
      <Animated.View style={[
        styles.anchor,
        {transform: [
          {rotate: rotation},
        ]},
      ]}>
        <Animated.View style={[
          styles.wrapper, 
          {
            bottom: elevationAnim,
            opacity: opacityAnim,
          },
          {transform: [
            {rotate: invertedRotation},
            {scale: scaleAnim},
          ]},
        ]}>
          {(this.state.icon == 'heart') && (
            <Ionicons 
              name={`ios-heart`}
              size={44}
              color={Colors.pink}
              style={styles.icon}
            />
          )}
          {this.state.icon == 'follower' && (
            <View style={styles.iconWrapper}>
              <Feather 
                name={`user-plus`}
                size={30}
                color={'white'}
                style={styles.smallerIcon}
              />
            </View>
          )}
          {this.state.icon == 'emoji' && (
            <Text style={{fontSize: 30}}>{this.state.emoji}</Text>
          )}
        </Animated.View>
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    top: -50, left: -50, right: -50, bottom: -50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    overflow: 'hidden', // bc fkn android
  },
  wrapper: {
    position: 'relative',
    opacity: 0,
    transform: [
      {rotate: '0deg'},
      {scale: 0},
    ],
    overflow: 'hidden', // bc fkn android
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // position: 'absolute',
    width: 44,
    height: 44,
    // bottom: -22,
    // left: -22,
    textAlign: 'center',
    overflow: 'hidden', // bc fkn android
  },
  iconWrapper: {
    width: 50,
    height: 40,
    backgroundColor: Colors.pink,
    borderRadius: 8,
    justifyContent: 'center',
    // overflow: 'hidden', // bc fkn android
  },
  smallerIcon: {
    textAlign: 'center',
    // overflow: 'hidden', // bc fkn android
  },
});
