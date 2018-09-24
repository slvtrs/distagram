import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export default class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Post',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {"Let's be real; no one is going to"} <Text style={{fontStyle: 'italic'}}>really</Text> {"look at it anyway.\n\nExcept for that one friend...\n\nSo why not just text it to them?"}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.basePadding,
    // backgroundColor: Colors.tabIconSelected,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    // color: '#fff',
    fontWeight: '500',
  },
});
