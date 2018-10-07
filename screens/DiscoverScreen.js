import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Layout from '../constants/Layout';
import Content from '../constants/Content';
import Post from '../components/Post';

export default class DiscoverScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <ScrollView style={styles.page}>
        <View style={styles.posts}>
          {Content.discover.map((post, i) => {
            return (
              <Post 
                key={i}
                index={i} 
                shadesOfGray={Content.discover.length} 
                post={post} 
                size={Layout.window.width/3}
                border
              />
            )
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  posts: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -3,
    // borderColor: 'red', borderWidth: 2,
  },
});
