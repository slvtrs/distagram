/*
 ugh this is no smoother than the sequence
*/

import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

import IconEmitter from '../components/IconEmitter'

export default class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Use',
  };

  constructor(props) {
    super(props);
    this.state = {
      lineLengthAnim: new Animated.Value(100),
      spinAnim: new Animated.Value(0),
      circleSizeAnim: new Animated.Value(160),
      colorAnim: new Animated.Value(0),
      buzzLeftAnim: new Animated.Value(0),
      animating: false,
      rewinding: false,
      emitters: [],
      charging: false,
    }
  }

  componentDidMount(){
    this.emitterTimeout
    this.spinDur = 1400
    this.bounceDur = 600
    this.rewindDur = this.bounceDur
    this._spinValue = 0
    this._colorValue = 0
    this.state.spinAnim.addListener(v => this._spinValue = v.value)
    this.state.colorAnim.addListener(v => this._colorValue = v.value)
  }

  render() {
    let {
      animating,
      rewinding,
      lineLengthAnim,
      circleSizeAnim,
      spinAnim,
      colorAnim,
      emitters,
      buzzLeftAnim,
    } = this.state

    let spin = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: rewinding ? ['0deg', '315deg'] : ['0deg', '585deg'],
    })

    let plusColor = colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.green, Colors.pink],
    })
    let circleColor = colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.green, Colors.pink],
    })
    let fillColor = colorAnim.interpolate({
      inputRange: [0, 3],
      outputRange: ['white', Colors.pink],
    })
    let buzzColor = colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.tabIconDefault, Colors.pink],
    })

    return (
      <View style={styles.container}>
        
        <View style={styles.textWrapper}>
          <Text style={[styles.text, styles.title]}>Go on, take a hit. </Text>
        </View>

        <View style={styles.animWrapper}>
          <Animated.View style={[
            styles.circleWrapper, 
            // {paddingLeft: buzzLeftAnim}
          ]}>
            <Animated.View style={[
              styles.circle, 
              {
                borderColor: circleColor,
                backgroundColor: fillColor,
                width: circleSizeAnim, 
                height: circleSizeAnim,
              }
            ]} />
          </Animated.View>
          <Animated.View style={[
            styles.rotWrapper, 
            {transform: [{rotate: spin}]},
          ]}>
            <View style={styles.plus}>
              <Animated.View style={[styles.vertical, {height: lineLengthAnim}, {backgroundColor: plusColor},]} />
              <Animated.View style={[styles.horizontal, {width: lineLengthAnim}, {backgroundColor: plusColor},]} />
            </View>
          </Animated.View>
        </View>

        <View style={styles.emitterWrapper}>
          {emitters.map((id, i) => {
            if(id !== 0){
              return <IconEmitter key={i} id={id} onExpire={this.handleExpireEmitter} />
            }
          })}
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableWithoutFeedback 
            onPressIn={this.handlePressIn} 
            onPressOut={this.handlePressOut}
            disabled={animating}
          >
            <View style={styles.button} />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.textWrapper}>
          <View style={styles.textRow}>
            <View><Text style={[styles.text, styles.wrappedText]}>That</Text></View> 
            <Animated.View style={{paddingLeft: buzzLeftAnim, width: 50}}>
              <Animated.Text style={[styles.text, styles.wrappedText, {color: buzzColor}]}>buzz</Animated.Text>
            </Animated.View> 
            <View><Text style={[styles.text, styles.wrappedText]}>of recognition</Text></View>
          </View>
          <View style={styles.textRow}>
            <View><Text style={[styles.text, styles.wrappedText]}>will stay with you for hours.</Text></View>
          </View>
        </View>

      </View>
    )
  }

  handlePressIn = () => {
    this.setState({charing: true})
    this.animPhase1()
  }

  animPhase1 = () => {
    Animated.timing(this.state.spinAnim, {
      duration: this.spinDur,
      toValue: 1,
      easing: Easing.bezier(.6,0,.5,.85),
    }).start()

    Animated.timing(this.state.circleSizeAnim, {
      toValue: 90,
      duration: this.spinDur,
      easing: Easing.bezier(.6,0,.5,.85),
    }).start(() => {
      this.handleAnimPhase1Compelte()
    })
  }

  handleAnimPhase1Compelte = () => {
    // if (this._spinValue === 1) {
    if (this._spinValue > 0.96) {
      this.animPhase2()
    }
  }

  animPhase2 = () => {
    Animated.timing(this.state.lineLengthAnim, {
      toValue: 160,
      duration: this.bounceDur,
      easing: Easing.bezier(.69,0,.83,.44),
    }).start()
    Animated.timing(this.state.colorAnim, {
      toValue: 1,
      duration: this.bounceDur,
      easing: Easing.bounce,
    }).start()
    Animated.timing(this.state.circleSizeAnim, {
      toValue: 26,
      duration: this.bounceDur,
      easing: Easing.bezier(.69,0,.83,.44),
    }).start(() => {
      this.handleAnimPhase2Complete()
    })
  }

  handleAnimPhase2Complete = () => {
    console.log(this._colorValue)
    // if (this._colorValue === 1) {
    if (this._colorValue > 0.96) {
      this.setState({emitting: true}, () => {
        this.emitIcons()
        this.runBuzzAnimation()
      })
    }
  }

  handlePressOut = () => {
    // break into 3 stesps with different rewind easing:
    // first step, minimun bounce (for a tap)
    // second step, like it is now
    // third step, after squeeze, less momentum, higher tension
    this.setState({charing: false, emitting: false})

    // Animated.parallel([
      Animated.timing(this.state.lineLengthAnim, {
        toValue: 100,
        duration: this.bounceDur,
        easing: Easing.bezier(.69,0,.83,.44),
      }).start()
      Animated.timing(this.state.colorAnim, {
        toValue: 0,
        duration: this.bounceDur,
        easing: Easing.bounce,
      }).start()
      Animated.timing(this.state.spinAnim, {
        duration: this.spinDur,
        toValue: 0,
        easing: Easing.bezier(.69,-0.22,.79,.84),
      }).start()
      Animated.timing(this.state.circleSizeAnim, {
        toValue: 160,
        duration: this.spinDur,
        easing: Easing.bezier(.69,-0.22,.79,.84),
      }).start()
    // ]).start(() => {})
  }

  emitIcons = () => {
    if(this.state.emitting){
      let emitters = this.state.emitters
      emitters.push(emitters.length + 1)
      this.setState({emitters})

      let refreshRate = 300 + Math.floor(Math.random() * 1000)
      this.emitterTimeout = setTimeout(() => {
        this.emitIcons()
      }, refreshRate)
    }
    else {
      if(this.emitterTimeout){
        clearTimeout(this.emitterTimeout);
      }
    }
  }

  runBuzzAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.buzzLeftAnim, {
          toValue: 4,
          duration: 50,
          delay: 0
        }),
        Animated.timing(this.state.buzzLeftAnim, {
          toValue: -4,
          duration: 50
        })
      ]),
      {
        iterations: 10
      }
    ).start(() => {
      this.state.buzzLeftAnim.setValue(0)
    })
  }

  handleExpireEmitter = id => {
    let emitters = this.state.emitters
    if(emitters.indexOf(id) >= 0){
      // console.log(`expiring emiiter id: ${id}`)
      emitters[emitters.indexOf(id)] = 0
    }
    this.setState({emitters})
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    padding: Layout.largePadding * 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.tabIconDefault,
  },
  title: {
    fontSize: 26,
  },
  textWrapper: {
    height: 100,
    justifyContent: 'center',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrappedText: {
    // numberOfLines: 1,
  },
  emitterWrapper: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  buttonWrapper: {
    margin: 60,
    position: 'absolute',
  },
  button: {
    width: 160,
    height: 160,
  },
  animWrapper: {
    margin: 60,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotWrapper: {
    // margin: 60,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleWrapper: {
    position: 'absolute',
  },
  circle: {
    borderColor: Colors.tabIconDefault,
    borderWidth: 8,
    width: 160,
    height: 160,
    borderRadius: 500,
  },
  plus: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  vertical: {
    width: 8,
    height: 100,
    borderRadius: 4,
    backgroundColor: Colors.tabIconDefault,
    position: 'absolute',
  },
  horizontal: {
    height: 8,
    width: 100,
    borderRadius: 4,
    backgroundColor: Colors.tabIconDefault,
    position: 'absolute',
  },
});
