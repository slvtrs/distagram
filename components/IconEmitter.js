import React from 'react';
import PropTypes from 'prop-types'
import Colors from '../constants/Colors';
import { Text, Animated, Easing, View, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';

import FloatingIcon from '../components/FloatingIcon'

export default class IconEmitter extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    onExpire: PropTypes.func.isRequired,
    amount: PropTypes.number,
  }

  static defaultProps = {
    amount: 10,
  }

  componentDidMount(){
    // console.log(`emitter ${this.props.id} mounted`)
    setTimeout(() => {
      this.props.onExpire(this.props.id)
    }, 5000)
  }

  componentWillUnmount(){
    // console.log(`emitter ${this.props.id} unmounting`)
  }

  constructor(props) {
    super(props);
    this.state = {
      count: 1 + Math.round(props.amount * Math.random())
    }
    console.log(props.amount)
  }

  render() {
    let {  count } = this.state
    let icons = []
    for (let i = 0; i < count; i++) icons.push(i);

    return (
      <View style={styles.wrapper}>
        {icons.map((id, i) => {
          return <FloatingIcon key={i} />
        })}
        {/*
          <Text style={{color:'green', fontSize:30}}>{this.props.id}</Text>
        */}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
